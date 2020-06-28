const assert = require("assert");
const { ObjectID } = require("mongodb");
const parseHtmlCheckboxes = require("./helpers/parseHtmlCheckboxes");

function validateTransaction(transaction) {
  // TODO Validate budget_id_list?
  assert(
    !isNaN(new Date(transaction.datetime)),
    "Transaction datetime must be a valid ISO date string"
  );
  // TODO Validate deposit_account_id?
  assert(
    typeof transaction.name === "string" && transaction.name.trim(),
    "Transaction name must be a non-empty string."
  );
  assert(
    !isNaN(transaction.usd_amount === "number"),
    "Transaction USD amount must be a valid number"
  );
  // TODO Validate withdrawal_account_id?
}

function parseTransaction(transaction) {
  return {
    budget_id_list: parseHtmlCheckboxes(transaction, "budget_"),
    datetime: new Date(transaction.datetime),
    deposit_account_id: transaction.deposit_account_id
      ? new ObjectID(transaction.deposit_account_id)
      : null,
    name: transaction.name.trim(),
    usd_amount: transaction.usd_amount,
    withdrawal_account_id: transaction.withdrawal_account_id
      ? new ObjectID(transaction.withdrawal_account_id)
      : null,
  };
}

module.exports = {
  getAllTransactions(db) {
    const collection = db.collection("transactions");
    return collection.find().toArray();
  },
  getTransaction(db, id) {
    const collection = db.collection("transactions");
    return collection.findOne({ _id: new ObjectID(id) });
  },
  newTransaction(db, transaction) {
    validateTransaction(transaction);
    const collection = db.collection("transactions");
    return collection.insertOne(parseTransaction(transaction));
  },
  editTransaction(db, id, transaction) {
    validateTransaction(transaction);
    const collection = db.collection("transactions");
    return collection.updateOne(
      { _id: new ObjectID(id) },
      { $set: parseTransaction(transaction) }
    );
  },
  deleteTransaction(db, id) {
    const collection = db.collection("transactions");
    return collection.deleteOne({ _id: new ObjectID(id) });
  },
};
