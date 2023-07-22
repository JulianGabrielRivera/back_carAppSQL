var express = require("express");
var router = express.Router();
const connection = require("../db/database.js");

router.post("/create", (req, res, next) => {
  console.log(req.body);
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
  const query = "INSERT INTO tasks(name,user_id) VALUES (?)";
  const values = [req.body.taskName, req.body.id];
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
  console.log("hey", req.body.id);
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

module.exports = router;
