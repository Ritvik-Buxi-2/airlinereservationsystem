const express = require("express");
const dotenv = require("dotenv").config();
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const mainRouter = require("./router/mainRouter");
const authRouter = require("./router/authRouter");
const adminRouter = require("./router/adminRouter");
const adminAuthRouter = require("./router/adminAuthRouter");
const db = require("./modules/db");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"), function (err) {
  if (err) console.error(err);
});

hbs.registerHelper("sno", (options) => {
  return parseInt(options.fn(this)) + 1;
});

db.connect((e) => {
  if (e) console.error(e);
  else console.log("Database connected");
});

app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/admin/auth", adminAuthRouter);

app.listen(process.env.PORT, () => {
  console.log("Application online");
});
