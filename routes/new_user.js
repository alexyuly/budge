const express = require('express');
const data = require('./data/users');

module.exports = function(db) {
  const router = express.Router();
  
  router.get('/', function(req, res, next) {
    res.render('new_user');
  });
  
  router.post('/', function(req, res, next) {
    data.newUser(db, req.body).then(function() {
      res.redirect('../manage_users');
    }).catch(next);
  });

  return router;
};
