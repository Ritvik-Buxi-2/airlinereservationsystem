const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const db = require("./db");
const jwt = require("../modules/token");

const loginAuth = async (req, res, next) => {
  const username = req.body.username,
    password = req.body.password;
  db.query(
    "SELECT * FROM tbusers WHERE username = ?",
    [username],
    async (err, result) => {
      if (result.length === 0) {
        next(false);
      } else {
        if (await bcrypt.compare(password, result[0].password)) {
          jwt.createToken(req, res, username, () => {
            next(true);
          });
        } else {
          // console.log("Password invalid");
          next(false);
        }
      }
    }
  );
};

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
