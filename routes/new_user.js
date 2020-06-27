const express = require("express");
const { newUser } = require("./data/users");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", function (req, res, next) {
    res.render("new_user");
  });

  router.post("/", async function (req, res, next) {
    try {
      await newUser(db, req.body);
      res.redirect("../manage_users");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
