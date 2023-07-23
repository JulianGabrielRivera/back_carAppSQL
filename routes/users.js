var express = require("express");
var router = express.Router();
const connection = require("../db/database.js");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const query = "SELECT * from users";

  connection.query(query, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});
router.post("/create/user", (req, res, next) => {
  console.log(req.body);
  // try {
  const query = "INSERT INTO users(first_name,last_name) VALUES (?)";
  const values = [req.body.first_name, req.body.last_name];

  connection.query(query, [values], function (err, results, fields) {
    if (err) {
      console.log(err);
    }

    res.json(results);
  });
  // } catch (err) {
  //   console.log(err);
  // }
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT tasks.id,
tasks.task_name, tasks.priority
FROM tasks 
INNER JOIN users as u ON u.id = tasks.user_id
WHERE u.id = ?`;

  const query2 = `SELECT first_name,last_name from users as u WHERE u.id = ?`;
  // const query = `
  //   SELECT u.first_name, u.last_name, t.task_name
  //   FROM tasks AS t
  //   INNER JOIN users AS u ON u.id = t.user_id
  //   WHERE u.id = ?`;

  const values = id;
  connection.query(query, [values], function (err, results, fields) {
    if (err) {
      return res.status(500).json({ error: "Database query error." });
    }

    connection.query(query2, [values], function (err, results2, fields) {
      if (err) {
        return res.status(500).json({ error: "Database query error." });
      }
      console.log(results);
      res.json({ queryOne: results, queryTwo: results2 });
    });
  });
});
router.post("/user/update", (req, res) => {
  console.log(req.body);
  const query = `UPDATE tasks SET priority = ? WHERE id = ${req.body.id}`;
  const values = req.body.priority;
  connection.query(query, [values], function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

module.exports = router;
