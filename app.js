const express = require("express");
const dotenv = require("dotenv").config();
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");

const mainRouter = require("./router/mainRouter");
const authRouter = require("./router/authRouter");
const db = require("./modules/db");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"), function (err) {
  if (err) console.error(err);
});

db.connect((e) => {
  if (e) console.error(e);
  else console.log("Database connected");
});

app.use("/", mainRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log("Application online");
});
