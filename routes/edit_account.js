const express = require('express');
const accountsData = require('./data/accounts');
const usersData = require('./data/users');

module.exports = function(db) {
  const router = express.Router();
  
  router.get('/:id', function(req, res, next) {
    accountsData.getAccount(db, req.params.id).then(function(account) {
      usersData.getAllUsers(db).then(function(user_list) {
        res.render('edit_account', {
          account,
          user_list,
        });
      });
    }).catch(next);
  });
  
  router.post('/:id', function(req, res, next) {
    accountsData.editAccount(db, req.params.id, req.body).then(function() {
      res.redirect('../manage_accounts');
    }).catch(next);
  });

  return router;
};
