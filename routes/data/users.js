const assert = require('assert');
const { ObjectID } = require('mongodb');

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
    assert(typeof user.name === 'string', 'Cannot create a new user with a name that is not a string.');
    const collection = db.collection('users');
    return collection.insertOne(user);
  },
  editUser(db, id, user) {
    if ('name' in user) {
      assert(typeof user.name === 'string', 'Cannot edit a user with a name that is not a string.');
    }
    const collection = db.collection('users');
    return collection.updateOne({ _id: new ObjectID(id) }, { $set: user });
  },
};
