const assert = require("assert");
const { ObjectID } = require("mongodb");

function validateAccount(account) {
  assert(typeof account.name === "string", "Account name must be a string.");
  assert(
    typeof account.order === "number" || account.order === "",
    "Account order must be a number or an empty string."
  );
}

function parseAccount(account) {
  return {
    name: account.name,
    order: account.order === "" ? null : account.order,
    owner_user_id_list: Object.keys(account)
      .filter((key) => key.startsWith("user_"))
      .map((key) => new ObjectID(key.slice("user_".length))),
  };
}

module.exports = {
  getAllAccounts(db) {
    const collection = db.collection("accounts");
    return collection.find().toArray();
  },
  getAccount(db, id) {
    const collection = db.collection("accounts");
    return collection.findOne({ _id: new ObjectID(id) });
  },
  newAccount(db, account) {
    validateAccount(account);
    const collection = db.collection("accounts");
    return collection.insertOne(parseAccount(account));
  },
  editAccount(db, id, account) {
    validateAccount(account);
    const collection = db.collection("accounts");
    return collection.updateOne(
      { _id: new ObjectID(id) },
      { $set: parseAccount(account) }
    );
  },
  deleteAccount(db, id) {
    const collection = db.collection("accounts");
    return collection.deleteOne({ _id: new ObjectID(id) });
  },
};
