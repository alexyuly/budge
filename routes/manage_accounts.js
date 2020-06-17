const express = require('express');
const data = require('./data/accounts');

module.exports = function(db) {
  const router = express.Router();
  
  router.get('/', function(req, res, next) {
    data.getAllAccounts(db).then(function(account_list) {
      res.render('manage_accounts', {
        account_list,
      });
    }).catch(next);
  });

  return router;
};
