const express = require("express");
const { newBudget } = require("./data/budgets");
const { getAllPeople } = require("./data/people");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", async function (req, res, next) {
    const person_list = await getAllPeople(db);
    res.render("new_budget", {
      person_list,
    });
  });

  router.post("/", async function (req, res, next) {
    try {
      await newBudget(db, req.body);
      res.redirect("../manage_budgets");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
