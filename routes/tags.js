const express = require("express");
const tagsRouter = express.Router();
const { requireUser, requireAdmin } = require("./utils");
const { getAllTags, getAllCardTags } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res, next) => {
  try {
    const tags = await getAllTags();
    console.log(tags);
    res.send(tags);
  } catch (error) {
    throw error;
  }
});

module.exports = tagsRouter;
