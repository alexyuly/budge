const express = require("express");
const data = require("./data/categories");

module.exports = function (db) {
  const router = express.Router();

  router.get("/:id", async function (req, res, next) {
    try {
      const category = await data.getCategory(db, req.params.id);
      res.render("edit_category", {
        category,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/:id", async function (req, res, next) {
    try {
      await data.editCategory(db, req.params.id, req.body);
      res.redirect("../manage_categories");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
