const express = require("express");

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  res.render("index");
});

mainRouter.get("/home", (req, res) => {
  res.redirect("/");
});

mainRouter.get("/login", (req, res) => {
  res.render("login");
});

mainRouter.get("/register", (req, res) => {
  res.render("register");
});

module.exports = mainRouter;
