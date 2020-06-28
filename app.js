const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const manage_accounts = require("./routes/manage_accounts");
const new_account = require("./routes/new_account");
const edit_account = require("./routes/edit_account");
const delete_account = require("./routes/delete_account");

const manage_budgets = require("./routes/manage_budgets");
const new_budget = require("./routes/new_budget");
const edit_budget = require("./routes/edit_budget");
const delete_budget = require("./routes/delete_budget");

const manage_people = require("./routes/manage_people");
const new_person = require("./routes/new_person");
const edit_person = require("./routes/edit_person");
const delete_person = require("./routes/delete_person");

const manage_transactions = require("./routes/manage_transactions");
const new_transaction = require("./routes/new_transaction");
const edit_transaction = require("./routes/edit_transaction");
const delete_transaction = require("./routes/delete_transaction");

module.exports = function (db) {
  const app = express();

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.use("/manage_accounts", manage_accounts(db));
  app.use("/new_account", new_account(db));
  app.use("/edit_account", edit_account(db));
  app.use("/delete_account", delete_account(db));

  app.use("/manage_budgets", manage_budgets(db));
  app.use("/new_budget", new_budget(db));
  app.use("/edit_budget", edit_budget(db));
  app.use("/delete_budget", delete_budget(db));

  app.use("/manage_people", manage_people(db));
  app.use("/new_person", new_person(db));
  app.use("/edit_person", edit_person(db));
  app.use("/delete_person", delete_person(db));

  app.use("/", manage_transactions(db));
  app.use("/new_transaction", new_transaction(db));
  app.use("/edit_transaction", edit_transaction(db));
  app.use("/delete_transaction", delete_transaction(db));

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  return app;
};
