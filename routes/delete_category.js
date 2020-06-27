const express = require("express");
const { getCategory, deleteCategory } = require("./data/categories");

module.exports = function (db) {
  const router = express.Router();

  router.get("/:id", async function (req, res, next) {
    try {
      const category = await getCategory(db, req.params.id);
      res.render("delete_category", {
        category,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/:id", async function (req, res, next) {
    try {
      await deleteCategory(db, req.params.id);
      res.redirect("../manage_categories");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
