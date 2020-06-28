const express = require("express");
const { getAllAccounts } = require("./data/accounts");
const { getAllBudgets } = require("./data/budgets");
const { getTransaction, editTransaction } = require("./data/transactions");

module.exports = function (db) {
  const router = express.Router();

  router.get("/:id", async function (req, res, next) {
    try {
      const transaction = await getTransaction(db, req.params.id);
      const account_list = await getAllAccounts(db);
      const budget_list = await getAllBudgets(db);
      res.render("edit_transaction", {
        transaction,
        account_list,
        budget_list,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/:id", async function (req, res, next) {
    try {
      await editTransaction(db, req.params.id, req.body);
      res.redirect("../");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
