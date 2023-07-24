var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: `${process.env.PASSWORD}`,
  database: "todolist",
});

connection.connect(() => {
  console.log("hi");
});

module.exports = connection;
