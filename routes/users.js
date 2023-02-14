const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { requireUser, requireAdmin } = require("./utils");
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
  toggleAdmin,
} = require("../db");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

//isAdmin Function
usersRouter.get("/", requireAdmin, async (req, res, next) => {
  try {
    const users = await getAllUsers();
    if (req.user.admin) {
      console.log(users);
      res.send(users);
    }
    next({
      name: "AccessError",
      message: "Must be Administrator to access users",
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.get("/profile/me", requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await getUserById(userId);
    if (!user) {
      next();
    } else {
      console.log(user);
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      res.status(401);
      next({
        name: "UserAlreadyExists",
        message: "A user by that username already exists",
      });
    } else if (password.length < 5) {
      res.status(401);
      next({
        name: "InputError",
        message: "Password must be atleast 5 characters",
      });
    } else {
      const newUser = await createUser({
        username,
        password,
        email,
      });
      if (!newUser) {
        next({
          name: "usercreationerror",
          message: "Problem with registration",
        });
      } else {
        const token = jwt.sign(
          { id: newUser.id, username: newUser.username, email: newUser.email },
          JWT_SECRET,
          { expiresIn: "1w" }
        );
        res.send({
          message: "Thank you for signing up!",
          token,
          user: newUser,
        });
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUser({ username, password });
    console.log(user);
    if (!user) {
      res.send({
        message: "Error: There is no CardEx Account associated with this User.",
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({ message: "You're Logged In!", token, user: user });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/:userId", requireUser, async (req, res, next) => {
  const { userId } = req.params;
  const { Boolean } = req.body;

  try {
    if (!req.user.admin) {
      next({ name: "Access Error", message: "Must be administrator" });
    } else {
      const newAdmin = await toggleAdmin(userId, Boolean);
      res.send(newAdmin);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
