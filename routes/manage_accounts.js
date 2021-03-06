const express = require("express");
const { getAllAccounts } = require("./data/accounts");
const { getAllPeople } = require("./data/people");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", async function (req, res, next) {
    try {
      const account_list = await getAllAccounts(db);
      const person_list = await getAllPeople(db);
      res.render("manage_accounts", {
        account_list,
        person_list,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
