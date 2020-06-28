const express = require("express");
const { getTransaction, deleteTransaction } = require("./data/transactions");

module.exports = function (db) {
  const router = express.Router();

  router.get("/:id", async function (req, res, next) {
    try {
      const transaction = await getTransaction(db, req.params.id);
      res.render("delete_transaction", {
        transaction,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/:id", async function (req, res, next) {
    try {
      await deleteTransaction(db, req.params.id);
      res.redirect("../");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
