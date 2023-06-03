const express = require("express");
const jwt = require("../modules/token");

const sqlAuth = require("../modules/sqlAuth");

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  jwt.verifyToken(req, res, (status) => {
    if (status) {
      sqlAuth.getUserRank(status.data, (rank) => {
        res.render("index", {
          in: true,
          user: status.data,
          admin: rank === "admin" ? true : false,
        });
      });
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

mainRouter.get("/profile", (req, res) => {
  jwt.verifyToken(req, res, (status) => {
    if (status) {
      sqlAuth.getUserData(status, (data) => {
        if (data) {
          sqlAuth.getUserRank(status.data, (rank) => {
            res.render("profile", {
              in: true,
              admin: rank === "admin" ? true : false,
              user: status.data || data[0].username,
              email: data[0].email,
              firstname: data[0].firstname,
              middlename: data[0].middlename,
              lastname: data[0].lastname,
              updated: req.url.split("=")[1] == "true" ? true : false,
            });
          });
        } else {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = mainRouter;

// // Tokens are destroyed in the module
