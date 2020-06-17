const express = require('express');
const accountsData = require('./data/accounts');
const usersData = require('./data/users');

module.exports = function(db) {
  const router = express.Router();
  
  router.get('/', function(req, res, next) {
    usersData.getAllUsers(db).then(function(user_list) {
      res.render('new_account', {
        user_list,
      });
    }).catch(next);
  });
  
  router.post('/', function(req, res, next) {
    accountsData.newAccount(db, req.body).then(function() {
      res.redirect('../manage_accounts');
    }).catch(next);
  });

  return router;
};
