const express = require("express");

const authRouter = express.Router();

const sqlAuth = require("../modules/sqlauth");

authRouter.post("/login", (req, res) => {
  // ? Add names to login form
});

authRouter.post("/register", (req, res, msg) => {
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

module.exports = authRouter;
