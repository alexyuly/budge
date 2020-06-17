const assert = require('assert');
const { ObjectID } = require('mongodb');

function validateAccount(account) {
  assert(!isNaN(account.initial_usd_amount), 'Cannot create a new account with an initial_usd_amount that is not a number.');
  assert(typeof account.name === 'string', 'Cannot create a new account with a name that is not a string.');
}

function parseAccount(account) {
  return {
    initial_usd_amount: Number(account.initial_usd_amount),
    name: account.name,
    owner_user_id_list: Object
      .keys(account)
      .filter(key => key.startsWith("user_"))
      .map(key => new ObjectID(key.slice("user_".length))),
  };
}

module.exports = {
  getAllAccounts(db) {
    const collection = db.collection('accounts');
    return collection.find().toArray();
  },
  getAccount(db, id) {
    const collection = db.collection('accounts');
    return collection.findOne({ _id: new ObjectID(id) });
  },
  newAccount(db, account) {
    validateAccount(account);
    const collection = db.collection('accounts');
    return collection.insertOne(parseAccount(account));
  },
  editAccount(db, id, account) {
    validateAccount(account);
    const collection = db.collection('accounts');
    return collection.updateOne({ _id: new ObjectID(id) }, { $set: parseAccount(account) });
  },
  deleteAccount(db, id) {
    const collection = db.collection('accounts');
    return collection.deleteOne({ _id: new ObjectID(id) });
  }
};
