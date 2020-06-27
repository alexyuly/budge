const express = require("express");
const { getUser, deleteUser } = require("./data/users");

module.exports = function (db) {
  const router = express.Router();

  router.get("/:id", async function (req, res, next) {
    try {
      const user = await getUser(db, req.params.id);
      res.render("delete_user", {
        user,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/:id", async function (req, res, next) {
    try {
      await deleteUser(db, req.params.id);
      res.redirect("../manage_users");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
