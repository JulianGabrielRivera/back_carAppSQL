var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var carsRouter = require("./routes/cars");
var tasksRouter = require("./routes/tasks");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "*", // <== URL of our future React app
  })
);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cars", carsRouter);
app.use("/tasks", tasksRouter);

module.exports = app;
