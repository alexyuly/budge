const express = require("express");
const { newAccount } = require("./data/accounts");
const { getAllUsers } = require("./data/users");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", async function (req, res, next) {
    try {
      const user_list = await getAllUsers(db);
      res.render("new_account", {
        user_list,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async function (req, res, next) {
    try {
      await newAccount(db, req.body);
      res.redirect("../manage_accounts");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
