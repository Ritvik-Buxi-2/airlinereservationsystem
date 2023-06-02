const express = require("express");
const dotenv = require("dotenv").config();
const hbs = require("hbs");
const path = require("path");

const mainRouter = require("./router/mainRouter");

const app = express();

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"), function (err) {
  if (err) console.error(err);
});

app.use("/", mainRouter);

app.listen(process.env.PORT, () => {
  console.log("Application online");
});
