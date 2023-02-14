const express = require("express");
const cardsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { requireUser, requireAdmin } = require("./utils");
const {
  getAllCards,
  createCard,
  updateViewCount,
  patchCards,
  getCardsById,
  getCardUserById,
  deleteCard,
} = require("../db");

cardsRouter.use((req, res, next) => {
  console.log("A request is being made to /cards");

  next();
});

cardsRouter.get("/", async (req, res, next) => {
  try {
    const cards = await getAllCards();
    console.log(cards);
    res.send(cards);
  } catch (error) {
    throw error;
  }
});

cardsRouter.get("/:cardId", async (req, res, next) => {
  const { cardId } = req.params;

  try {
    const card = await getCardsById(cardId);
    if (!card) {
      next();
    } else {
      console.log(card);
      res.send(card);
    }
  } catch (error) {
    next(error);
  }
});

cardsRouter.post("/", requireUser, async (req, res, next) => {
  // Math.floor(Math.random() * 100 );
  const { 
    card_title, 
    description, price, 
    card_img, view_count, 
    quantity,
  } = req.body;
  const cardData = {};
  let ranNum;
  if (!quantity) {
    ranNum = Math.floor(Math.random() * 100);
  }

  try {
    cardData.card_title = card_title;
    cardData.description = description;
    cardData.price = price;
    cardData.card_img = card_img;
    cardData.view_count = view_count ? view_count : 1;
    ranNum ? cardData.quantity = ranNum : cardData.quantity = quantity;

    const card = await createCard(cardData);
    res.send(card);
  } catch (error) {
    throw error;
  }
});

cardsRouter.patch("/:id/views", async (req, res, next) => {
  const { id } = req.params;

  try {
    await updateViewCount(id);
    res.send({ message: "Updated views!" });
  } catch (error) {
    throw error;
  }
});

cardsRouter.patch("/:cardId", requireUser, async (req, res, next) => {
  const { card_title, description, price, card_img, quantity } = req.body;
  const { cardId } = req.params;
  const cardData = {};

  if (card_title) {
    cardData.card_title = card_title;
  }
  if (description) {
    cardData.description = description;
  }
  if (price) {
    cardData.price = price;
  }
  if (card_img) {
    cardData.card_img = card_img;
  }
  if (quantity) {
    cardData.quantity = quantity;
  }

  try {
    if (!req.user.admin) {
      next({
        name: "Access Error",
        message: "Must be administrator to delete cards",
      });
    } else {
      const updatedCard = await patchCards(cardId, cardData);
      console.log(updatedCard);
      res.send(updatedCard);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cardsRouter.delete("/:cardId", requireUser, async (req, res, next) => {
  const { cardId } = req.params;
  try {
    // const card = await getCardsById(cardId);
    if (!req.user.admin) {
      next({
        name: "Access Error",
        message: "Must be administrator to delete cards",
      });
    } else {
      const deletedCard = await deleteCard(cardId);
      console.log(deletedCard);
      res.send(deletedCard);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = cardsRouter;
