const express = require("express");
const adminAuthRouter = express.Router();

const sqlAdmin = require("../modules/sqlAdmin");

adminAuthRouter.post("/deleteuser", (req, res) => {
  const id = parseInt(req.url.split("id=")[1]);
  sqlAdmin.deleteUser(id, () => {
    res.redirect("/admin/manage-users");
  });
});

module.exports = adminAuthRouter;
