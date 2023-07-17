var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ironhacker6!",
  database: "todolist",
});

connection.connect(() => {
  console.log("hi");
});

module.exports = connection;
