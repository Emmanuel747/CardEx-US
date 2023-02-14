const express = require("express");
const cartRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { requireUser } = require("./utils");
const {
  getCartByUserId,
  getCardsById,
  addCardToCart,
  createCart,
  getUserById,
  createCartItem,
  getUserCartProducts,
  getCardUserById,
  deleteCardFromCart,
  getUserCart,
  getAllOrders,
  checkoutCart,

} = require("../db");

cartRouter.use((req, res, next) => {
  console.log("A request is being made to /cart");

  next();
});

cartRouter.get("/:userId", requireUser, async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cart = await getUserCart(userId);
    console.log(cart);
    res.send({
      message: "Cart retrived Successfully!",
      data: cart
    });
    console.log(cart);
  } catch (err) {
    throw err;
  }
})

// cartRouter.post("/:userId", async (req, res, next) => {
//   const { userId } = req.params;
//   try {
//     const addedCart = await createCart(userId);
//     console.log(addedCart);
//     res.send(addedCart);
//   } catch (error) {
//     next(error);
//   }
// });

cartRouter.post("/", async (req, res, next) => {
  let { quantity, userId, cardId } = req.body;
  if (!quantity) { quantity = 1 }
  try {
    const cart = await createCartItem(userId, cardId);
    const currentCart = await getUserCart(userId);
    res.send({
      data: cart,
      activeCart: currentCart,
      message: "Successfully added Item to Cart"
    });
  } catch (error) {
    next(error);
  }
});

cartRouter.patch("/checkout/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const completedCart = await checkoutCart(userId);
    res.send({
      data: completedCart,
      message: "Success, Checkout compelete! Check Orders for more info."
    })
  } catch (err) {
    next(err);
  }
});

cartRouter.delete("/:itemId", requireUser, async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const deletedCard = await deleteCardFromCart(itemId);
    console.log(deletedCard, "IN ROUTES cart")
    res.send({
      data: deletedCard, 
      message: `successfully deleted from cart.`});
  } catch (error) {
    next(error, "Witness me");
  }
});

module.exports = cartRouter;