const express = require("express");
const jwt = require("../modules/token");

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  jwt.verifyToken(req, res, (status) => {
    if (status) {
      res.render("index", { in: true, user: status.data });
    } else {
      res.render("index", { in: false });
    }
  });
});

mainRouter.get("/home", (req, res) => {
  res.redirect("/");
});

mainRouter.get("/login", (req, res) => {
  jwt.verifyToken(req, res, (status) => {
    if (status) {
      res.redirect("/");
    } else {
      res.render("login", { in: false });
    }
  });
});

mainRouter.get("/register", (req, res) => {
  jwt.verifyToken(req, res, (status) => {
    if (status) {
      res.redirect("/");
    } else {
      res.render("register", { in: false });
    }
  });
});

mainRouter.get("/logout", (req, res) => {
  jwt.clearToken(req, res, () => {
    res.redirect("/");
  });
});

module.exports = mainRouter;
