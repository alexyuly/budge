const express = require("express");
const { getAllBudgets } = require("./data/budgets");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", async function (req, res, next) {
    try {
      const budget_list = await getAllBudgets(db);
      res.render("manage_budgets", {
        budget_list,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
