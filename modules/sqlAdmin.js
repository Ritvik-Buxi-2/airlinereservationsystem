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

module.exports = { getDashboardData };
