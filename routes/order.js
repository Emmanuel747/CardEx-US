const express = require("express");
const ordersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { requireUser, requireAdmin } = require("./utils");
const { createUserOrder, getAllOrders, getInactiveUserCart } = require("../db");

ordersRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const data = await createUserOrder(req.user.id);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

ordersRouter.get("/all", requireUser, async (req, res, next) => {
  const { admin } = req.user;

  if (admin) {
    try {
      const cart = await getAllOrders();
      console.log(cart);
      res.send({
        message: "All Orders retrived successfully",
        data: cart
      });
    } catch (err) {
      throw err;
    }
  }
});

ordersRouter.get("/user", requireUser, async (req, res, next) => {
  const { id } = req.user;

  try {
    const pastOrders = await getInactiveUserCart();
    console.log(pastOrders);
    res.send({
      data: pastOrders,
      message: "Your orders were retrived successfully"
    });
  } catch (err) {
    throw err;
  }
});

// ordersRouter.get("/all", async (req, res, next) => {
//   try {
//     const data = await getAllOrders();
//     const orders = [];
//     data.forEach((el, index) => {
//       if (orders.some((order) => order.id === el.id)) {
//         const orderIndx = orders.findIndex((e) => e.id === el.id);
//         orders[orderIndx].products.push(el);
//       } else {
//         orders.push({
//           id: el.id,
//           products: [
//             {
//               card_title: el.card_title,
//               price: el.price,
//               card_img: el.card_img,
//               quanity: el.quanity,
//             },
//           ],
//         });
//       }
//     });
//     res.send(orders);
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = ordersRouter;
