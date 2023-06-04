const db = require("./db");

const getDashboardData = (next) => {
  db.query(`SELECT * FROM tbusers`, (err, result) => {
    db.query(`SELECT * FROM tbusers WHERE rank = 'member'`, (er, res) => {
      db.query(`SELECT * FROM tbusers WHERE rank = 'manager'`, (e, r) => {
        next(result.length, res.length, r.length);
      });
    });
  });
};

const getUsers = (next) => {
  db.query(`SELECT * FROM tbusers`, (err, result) => {
    next(result);
  });
};

const deleteUser = (id, next) => {
  if (id == 1) {
    next();
  } else {
    db.query(`DELETE FROM tbusers WHERE id = ?`, [id], (err, res) => {
      if (err) console.error(err);
      else next();
    });
  }
};

module.exports = { getDashboardData, getUsers, deleteUser };
