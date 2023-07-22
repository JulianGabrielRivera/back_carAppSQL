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

module.exports = router;
