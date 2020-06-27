const express = require("express");
const { getAccount, editAccount } = require("./data/accounts");
const { getAllUsers } = require("./data/users");

module.exports = function (db) {
  const router = express.Router();

  router.get("/:id", async function (req, res, next) {
    try {
      const account = await getAccount(db, req.params.id);
      const user_list = await getAllUsers(db);
      res.render("edit_account", {
        account,
        user_list,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/:id", async function (req, res, next) {
    try {
      await editAccount(db, req.params.id, req.body);
      res.redirect("../manage_accounts");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
