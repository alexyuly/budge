const express = require("express");
const { getPerson, editPerson } = require("./data/people");

module.exports = function (db) {
  const router = express.Router();

  router.get("/:id", async function (req, res, next) {
    try {
      const person = await getPerson(db, req.params.id);
      res.render("edit_person", {
        person,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/:id", async function (req, res, next) {
    try {
      await editPerson(db, req.params.id, req.body);
      res.redirect("../manage_people");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
