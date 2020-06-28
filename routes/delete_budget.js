const express = require("express");
const { getBudget, deleteBudget } = require("./data/budgets");

module.exports = function (db) {
  const router = express.Router();

  router.get("/:id", async function (req, res, next) {
    try {
      const budget = await getBudget(db, req.params.id);
      res.render("delete_budget", {
        budget,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/:id", async function (req, res, next) {
    try {
      await deleteBudget(db, req.params.id);
      res.redirect("../manage_budgets");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
