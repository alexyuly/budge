const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const manageUsersRouter = require("./routes/manage_users");
const newUserRouter = require("./routes/new_user");
const editUserRouter = require("./routes/edit_user");
const deleteUserRouter = require("./routes/delete_user");

const manageAccountsRouter = require("./routes/manage_accounts");
const newAccountRouter = require("./routes/new_account");
const editAccountRouter = require("./routes/edit_account");
const deleteAccountRouter = require("./routes/delete_account");

const manageCategoriesRouter = require("./routes/manage_categories");
const newCategoryRouter = require("./routes/new_category");
const editCategoryRouter = require("./routes/edit_category");
const deleteCategoryRouter = require("./routes/delete_category");

const newTransactionRouter = require("./routes/new_transaction");

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

  app.use("/", indexRouter(db));

  app.use("/manage_users", manageUsersRouter(db));
  app.use("/new_user", newUserRouter(db));
  app.use("/edit_user", editUserRouter(db));
  app.use("/delete_user", deleteUserRouter(db));

  app.use("/manage_accounts", manageAccountsRouter(db));
  app.use("/new_account", newAccountRouter(db));
  app.use("/edit_account", editAccountRouter(db));
  app.use("/delete_account", deleteAccountRouter(db));

  app.use("/manage_categories", manageCategoriesRouter(db));
  app.use("/new_category", newCategoryRouter(db));
  app.use("/edit_category", editCategoryRouter(db));
  app.use("/delete_category", deleteCategoryRouter(db));

  app.use("/new_transaction", newTransactionRouter(db));

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
