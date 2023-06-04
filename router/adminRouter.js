const express = require("express");

const adminRouter = express.Router();

const jwt = require("../modules/token");
const sqlAdmin = require("../modules/sqlAdmin");
const sqlAuth = require("../modules/sqlAuth");

adminRouter.get("/dashboard", (req, res) => {
  jwt.verifyToken(req, res, (token) => {
    sqlAuth.getUserRank(token.data, (rank) => {
      if (rank === "admin") {
        sqlAdmin.getDashboardData((totalCount, totalMembers, totalManagers) => {
          res.render("admin_dashboard", {
            elevated: true,
            in: true,
            user: token.data,
            totalCount: totalCount,
            totalMembers: totalMembers,
            totalManagers: totalManagers,
          });
        });
      } else res.redirect("/");
    });
  });
});

adminRouter.get("/manage-users", (req, res) => {
  jwt.verifyToken(req, res, (token) => {
    sqlAuth.getUserRank(token.data, (rank) => {
      if (rank === "admin") {
        sqlAdmin.getUsers((users) => {
          res.render("admin_user_management", {
            elevated: true,
            in: true,
            user: token.data,
            users: users,
          });
        });
      } else res.redirect("/");
    });
  });
});

module.exports = adminRouter;
