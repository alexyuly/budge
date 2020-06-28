const express = require("express");
const { newPerson } = require("./data/people");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", function (req, res, next) {
    res.render("new_person");
  });

  router.post("/", async function (req, res, next) {
    try {
      await newPerson(db, req.body);
      res.redirect("../manage_people");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
