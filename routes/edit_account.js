const express = require("express");
const accountsData = require("./data/accounts");
const usersData = require("./data/users");

module.exports = function (db) {
  const router = express.Router();

  router.get("/:id", async function (req, res, next) {
    try {
      const account = await accountsData.getAccount(db, req.params.id);
      const user_list = await usersData.getAllUsers(db);
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
      await accountsData.editAccount(db, req.params.id, req.body);
      res.redirect("../manage_accounts");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
