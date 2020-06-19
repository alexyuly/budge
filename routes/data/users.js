const assert = require("assert");
const { ObjectID } = require("mongodb");

function validateUser(user) {
  assert(typeof user.name === "string", "User name must be a string.");
  assert(
    typeof user.order === "number" || user.order === "",
    "User order must be a number or an empty string."
  );
}

function parseUser(user) {
  return {
    name: user.name,
    order: user.order === "" ? null : user.order,
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
