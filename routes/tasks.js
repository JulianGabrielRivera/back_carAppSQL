var express = require("express");
var router = express.Router();
const connection = require("../db/database.js");

router.post("/create", (req, res, next) => {
  const allUsersQuery = () => {
    const queryAllUsers = "SELECT * from users";

    connection.query(queryAllUsers, function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      res.json(results);
    });
  };
  // try {
  const query = "INSERT INTO tasks(task_name,priority,user_id) VALUES (?)";
  const values = [req.body.taskName, req.body.priority, req.body.id];
  const queryThree = `UPDATE users SET user_task = 0 WHERE users.id = ${req.body.id}`;

  connection.query(query, [values], function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(results);
    // res.json(results);
  });
  connection.query(queryThree, null, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    allUsersQuery();
  });
  // } catch (err) {
  //   console.log(err);
  // }
});

router.post("/boolean", (req, res, next) => {
  const allUsersQuery = () => {
    const queryAllUsers = "SELECT * from users";

    connection.query(queryAllUsers, function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      res.json(results);
    });
  };
  const id = req.body.id;
  const query = `UPDATE users SET user_task = 1 WHERE users.id = ${id}`;
  //   connection.query(query, null, function (err, results, fields) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(results);
  //     // res.json(results);
  //   });

  const queryTwo = `SELECT user_task FROM users WHERE users.id = ${id}`;
  const queryThree = `UPDATE users SET user_task = 0 WHERE users.id = ${id}`;
  connection.query(queryTwo, null, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    if (results[0].user_task === 1) {
      connection.query(queryThree, null, function (err, results, fields) {
        if (err) {
          console.log(err);
        }
      });
      allUsersQuery();
    } else {
      connection.query(query, null, function (err, results, fields) {
        if (err) {
          console.log(err);
        }
      });
      allUsersQuery();
    }
  });
});
router.post("/delete", (req, res) => {
  const query = "DELETE FROM tasks WHERE id = ?";
  const values = req.body.id;
  console.log("id");
  connection.query(query, values, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(results);
    res.json(results);
  });
});

module.exports = router;
