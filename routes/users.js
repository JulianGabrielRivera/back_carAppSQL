var express = require("express");
var router = express.Router();
const connection = require("../db/database.js");
const Tesseract = require("tesseract.js");
const { createWorker } = require("tesseract.js");

router.post("/tesseract", (req, res, next) => {
  console.log(req.body);
  const query = "SELECT image from users WHERE id = ?";
  const values = 11;
  connection.query(query, values, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(results[0].image, "hiii");
    Tesseract.recognize(`${results[0].image}`, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      console.log(text);
      res.json({ text: text, image: results[0].image });
    });
  });
});
router.post("/tesseract2", (req, res, next) => {
  console.log(req.body, "hi22");
  
  
  Tesseract.recognize(`${req.body.image2}`, "eng", {
    logger: (m) => console.log(m),
  }).then(({ data: { text } }) => {
    console.log(text);
    res.json(text);
  });
});
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
  const query = "INSERT INTO users(first_name,last_name,image) VALUES (?)";
  const values = [req.body.first_name, req.body.last_name, req.body.image];

  connection.query(query, [values], function (err, results, fields) {
    console.log(results);
    if (err) {
      return res.status(500).json({ error: "Failed to create user" });
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
