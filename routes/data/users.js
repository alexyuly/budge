const assert = require("assert");
const { ObjectID } = require("mongodb");

function validateUser(user) {
  assert(typeof user.name === "string", "User name must be a string.");
  assert(!isNaN(user.order === "number"), "User order must be a valid number");
}

function parseUser(user) {
  return {
    name: user.name,
    order: user.order === "" ? null : Number(user.order),
  };
}

module.exports = {
  getAllUsers(db) {
    const collection = db.collection("users");
    return collection.find().toArray();
  },
  getUser(db, id) {
    const collection = db.collection("users");
    return collection.findOne({ _id: new ObjectID(id) });
  },
  newUser(db, user) {
    validateUser(user);
    const collection = db.collection("users");
    return collection.insertOne(parseUser(user));
  },
  editUser(db, id, user) {
    validateUser(user);
    const collection = db.collection("users");
    return collection.updateOne(
      { _id: new ObjectID(id) },
      { $set: parseUser(user) }
    );
  },
  deleteUser(db, id) {
    const collection = db.collection("users");
    return collection.deleteOne({ _id: new ObjectID(id) });
  },
};
