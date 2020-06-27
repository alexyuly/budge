const express = require("express");
const { getAllCategories } = require("./data/categories");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", async function (req, res, next) {
    try {
      const category_list = await getAllCategories(db);
      res.render("manage_categories", {
        category_list,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
