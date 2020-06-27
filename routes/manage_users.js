const express = require("express");
const { getAllUsers } = require("./data/users");

module.exports = function (db) {
  const router = express.Router();

  router.get("/", async function (req, res, next) {
    try {
      const user_list = await getAllUsers(db);
      res.render("manage_users", {
        user_list,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
