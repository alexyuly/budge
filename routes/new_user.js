const express = require('express');
const users = require('./data/users');

module.exports = function(db) {
  const router = express.Router();
  
  router.get('/', function(req, res, next) {
    res.render('new_user');
  });
  
  router.post('/', async function(req, res, next) {
    await users.newUser(db, req.body);
    res.redirect('../');
  });

  return router;
};
