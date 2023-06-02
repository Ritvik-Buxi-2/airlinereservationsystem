const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const db = require("./db");
const { use } = require("../router/mainRouter");

const loginAuth = () => {};

const registerAuth = async (req, res, next) => {
  const username = req.body.username,
    email = req.body.email,
    password = await bcrypt.hash(req.body.password, parseInt(process.env.HASH));
  db.query(
    "SELECT * FROM tbusers WHERE username = ? OR email = ?",
    [username, email],
    (err, result) => {
      if (result.length === 0) {
        db.query(
          `INSERT INTO tbusers (username, email, password, dateCreated, dateModified) VALUES (?, ?, ?, now(), now())`,
          [username, email, password],
          (e, r) => {
            if (e) console.error(e);
            else next(false, false, true);
          }
        );
      } else if (result[0].username == username) {
        return next(true, false, false);
      } else if (result[0].email == email) {
        return next(false, true, false);
      } else {
        console.error(err);
      }
    }
  );
};

module.exports = { loginAuth, registerAuth };
