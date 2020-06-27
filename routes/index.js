const express = require("express");
const { getAllAccounts } = require("./data/accounts");
const { getAllCategories } = require("./data/categories");
const { getAllTransactions } = require("./data/transactions");
const { getAllUsers } = require("./data/users");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", async function (req, res, next) {
    try {
      const account_list = await getAllAccounts(db);
      const category_list = await getAllCategories(db);
      const transaction_list = await getAllTransactions(db);
      const user_list = await getAllUsers(db);
      res.render("index", {
        account_list,
        category_list,
        transaction_list,
        user_list,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
