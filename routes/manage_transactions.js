const express = require("express");
const { getAllAccounts } = require("./data/accounts");
const { getAllTransactions } = require("./data/transactions");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", async function (req, res, next) {
    try {
      const account_list = await getAllAccounts(db);
      const transaction_list = await getAllTransactions(db);
      res.render("manage_transactions", {
        account_list,
        transaction_list,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
