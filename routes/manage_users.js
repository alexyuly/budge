const express = require("express");
const data = require("./data/users");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", function (req, res, next) {
    data
      .getAllUsers(db)
      .then(function (user_list) {
        res.render("manage_users", {
          user_list,
        });
      })
      .catch(next);
  });

  return router;
};
