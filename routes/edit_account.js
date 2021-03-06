const express = require("express");
const { getAccount, editAccount } = require("./data/accounts");
const { getAllPeople } = require("./data/people");

module.exports = function (db) {
  const router = express.Router();

  router.get("/:id", async function (req, res, next) {
    try {
      const account = await getAccount(db, req.params.id);
      const person_list = await getAllPeople(db);
      res.render("edit_account", {
        account,
        person_list,
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
