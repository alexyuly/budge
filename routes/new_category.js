const express = require("express");
const { newCategory } = require("./data/categories");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", function (req, res, next) {
    res.render("new_category");
  });

  router.post("/", async function (req, res, next) {
    try {
      await newCategory(db, req.body);
      res.redirect("../manage_categories");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
