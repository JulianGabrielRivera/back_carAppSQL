var express = require("express");
var router = express.Router();
const connection = require("../db/database.js");

router.get("/", (req, res, next) => {
  const query = "SELECT * FROM cars";

  connection.query(query, function (err, results, fields) {
    if (err) {
      console.log(err);
    }

    res.json(results);
  });
});
router.post("/create/car", (req, res, next) => {
  // try {
  const query = "INSERT INTO cars(name,make) VALUES (?)";
  const values = [req.body.name, req.body.make];

  connection.query(query, [values], function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    return res.json(results);
  });
  // } catch (err) {
  //   console.log(err);
  // }
});

module.exports = router;
