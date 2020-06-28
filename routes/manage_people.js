const express = require("express");
const { getAllPeople } = require("./data/people");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", async function (req, res, next) {
    try {
      const person_list = await getAllPeople(db);
      res.render("manage_people", {
        person_list,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
