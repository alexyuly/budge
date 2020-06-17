const assert = require('assert');
const { ObjectID } = require('mongodb');

function validateUser(user) {
  assert(typeof user.name === 'string', 'Cannot create a new user with a name that is not a string.');
}

function parseUser(user) {
  return {
    name: user.name,
  };
}

module.exports = {
  getAllUsers(db) {
    const collection = db.collection('users');
    return collection.find().toArray();
  },
  getUser(db, id) {
    const collection = db.collection('users');
    return collection.findOne({ _id: new ObjectID(id) });
  },
  newUser(db, user) {
    validateUser(user);
    const collection = db.collection('users');
    return collection.insertOne(parseUser(user));
  },
  editUser(db, id, user) {
    validateUser(user);
    const collection = db.collection('users');
    return collection.updateOne({ _id: new ObjectID(id) }, { $set: parseUser(user) });
  },
  deleteUser(db, id) {
    const collection = db.collection('users');
    return collection.deleteOne({ _id: new ObjectID(id) });
  }
};
