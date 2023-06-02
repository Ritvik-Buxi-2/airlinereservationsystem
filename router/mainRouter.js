const express = require("express");

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  res.render("index");
});

mainRouter.get("/home", (req, res) => {
  res.redirect("/");
});

module.exports = mainRouter;
