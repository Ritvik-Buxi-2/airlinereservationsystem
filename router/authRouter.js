const express = require("express");

const authRouter = express.Router();

const jwt = require("../modules/token");

const sqlAuth = require("../modules/sqlAuth");

authRouter.post("/login", (req, res) => {
  sqlAuth.loginAuth(req, res, (status) => {
    if (status) {
      res.redirect("/");
    } else {
      res.render("login", { errorMsg: true });
    }
  });
});

authRouter.post("/register", (req, res) => {
  sqlAuth.registerAuth(req, res, (u, e, n) => {
    if (u) {
      res.render("register", {
        u: true,
      });
    } else if (e) {
      res.render("register", {
        e: true,
      });
    } else if (n) {
      res.render("register", {
        n: true,
      });
    }
  });
});

authRouter.post("/update-profile", (req, res) => {
  jwt.verifyToken(req, res, (status) => {
    if (status) {
      sqlAuth.updateUserData(status.data, req.body, (status) => {
        if (status) {
          res.redirect("/profile?updated=true");
        } else {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = authRouter;
