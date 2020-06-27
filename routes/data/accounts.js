const assert = require("assert");
const { ObjectID } = require("mongodb");
const parseHtmlCheckboxes = require("./helpers/parseHtmlCheckboxes");

function validateAccount(account) {
  assert(typeof account.name === "string", "Account name must be a string.");
  assert(
    !isNaN(account.order === "number"),
    "Account order must be a valid number"
  );
  // TODO Validate user_id_list?
}

function parseAccount(account) {
  return {
    name: account.name,
    order: account.order === "" ? null : Number(account.order),
    user_id_list: parseHtmlCheckboxes(account, "user_"),
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
