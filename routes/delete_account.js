const express = require("express");
const { getAccount, deleteAccount } = require("./data/accounts");

module.exports = function (db) {
  const router = express.Router();

  router.get("/:id", async function (req, res, next) {
    try {
      const account = await getAccount(db, req.params.id);
      res.render("delete_account", {
        account,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/:id", async function (req, res, next) {
    try {
      await deleteAccount(db, req.params.id);
      res.redirect("../manage_accounts");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
