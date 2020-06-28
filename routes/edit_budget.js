const express = require("express");
const { getBudget, editBudget } = require("./data/budgets");
const { getAllPeople } = require("./data/people");

module.exports = function (db) {
  const router = express.Router();

  router.get("/:id", async function (req, res, next) {
    try {
      const budget = await getBudget(db, req.params.id);
      const person_list = await getAllPeople(db);
      res.render("edit_budget", {
        budget,
        person_list,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/:id", async function (req, res, next) {
    try {
      await editBudget(db, req.params.id, req.body);
      res.redirect("../manage_budgets");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
