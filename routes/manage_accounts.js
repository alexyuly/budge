const express = require("express");
const accountsData = require("./data/accounts");
const usersData = require("./data/users");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", async function (req, res, next) {
    try {
      const account_list = await accountsData.getAllAccounts(db);
      const user_list = await usersData.getAllUsers(db);
      res.render("manage_accounts", {
        account_list,
        user_list,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
