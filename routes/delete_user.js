const express = require("express");
const data = require("./data/users");

module.exports = function (db) {
  const router = express.Router();

  router.get("/:id", function (req, res, next) {
    data
      .getUser(db, req.params.id)
      .then(function (user) {
        res.render("delete_user", {
          user,
        });
      })
      .catch(next);
  });

  router.post("/:id", function (req, res, next) {
    data
      .deleteUser(db, req.params.id)
      .then(function () {
        res.redirect("../manage_users");
      })
      .catch(next);
  });

  return router;
};
