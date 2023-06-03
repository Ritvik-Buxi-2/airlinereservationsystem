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
          next(false);
        }
      }
    }
  );
};

const registerAuth = async (req, res, next) => {
  const username = req.body.username,
    email = req.body.email,
    firstname = req.body.firstname,
    middlename = req.body.middlename,
    lastname = req.body.lastname,
    password = await bcrypt.hash(req.body.password, parseInt(process.env.HASH));
  db.query(
    "SELECT * FROM tbusers WHERE username = ? OR email = ?",
    [username, email],
    (err, result) => {
      if (result.length === 0) {
        db.query(
          `INSERT INTO tbusers (username, email, password, firstname, middlename, lastname, dateCreated, dateModified, rank) VALUES (?, ?, ?, ?, ?, ?, now(), now(), ?)`,
          [
            username,
            email,
            password,
            firstname,
            middlename,
            lastname,
            process.env.RANK_1,
          ],
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

const getUserData = (status, next) => {
  db.query(
    `SELECT * FROM tbusers WHERE username = ?`,
    [status.data],
    (err, result) => {
      if (result.length === 0) {
        next(false);
      } else {
        next(result);
      }
      if (err) throw err;
    }
  );
};

const updateUserData = (user, data, next) => {
  db.query(
    `UPDATE tbusers SET firstname = ?, middlename = ?, lastname = ?, datemodified = now() WHERE username = ?`,
    [data.firstname, data.middlename, data.lastname, user],
    (err, result) => {
      if (err) {
        next(false);
      } else {
        next(true);
      }
    }
  );
};

const getUserRank = (user, next) => {
  db.query(`SELECT rank FROM tbusers WHERE username = ?`, [user], (err, result) => {
    if (result.length === 0) {
      next(false);
    } else {
      next(result[0].rank);
    }
  });
};

module.exports = {
  loginAuth,
  registerAuth,
  getUserData,
  updateUserData,
  getUserRank,
};
