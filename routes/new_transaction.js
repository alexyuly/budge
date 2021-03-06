const express = require("express");
const { getAllAccounts } = require("./data/accounts");
const { getAllBudgets } = require("./data/budgets");
const { newTransaction } = require("./data/transactions");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", async function (req, res, next) {
    try {
      const account_list = await getAllAccounts(db);
      const budget_list = await getAllBudgets(db);
      res.render("new_transaction", {
        account_list,
        budget_list,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async function (req, res, next) {
    try {
      await newTransaction(db, req.body);
      res.redirect("../");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
