const assert = require("assert");
const { ObjectID } = require("mongodb");
const parseHtmlCheckboxes = require("./helpers/parseHtmlCheckboxes");

function validateTransaction(transaction) {
  assert(
    !isNaN(new Date(transaction.datetime)),
    "Transaction datetime must be a valid ISO date string"
  );
  assert(
    typeof transaction.description === "string" &&
      transaction.description.trim(),
    "Transaction description must be a non-empty string."
  );
  assert(
    !isNaN(transaction.usd_amount === "number"),
    "Transaction USD amount must be a valid number"
  );
  // TODO Validate source_account_id?
  // TODO Validate target_account_id?
  // TODO Validate category_list?
}

function parseTransaction(transaction) {
  return {
    datetime: new Date(transaction.datetime),
    description: transaction.description.trim(),
    usd_amount: transaction.usd_amount,
    source_account_id: new ObjectID(transaction.source_account_id),
    target_account_id: new ObjectID(transaction.target_account_id),
    category_id_list: parseHtmlCheckboxes(transaction, "category_"),
  };
}

module.exports = {
  getAllTransactions(db) {
    const collection = db.collection("transactions");
    return collection.find().toArray();
  },
  newTransaction(db, transaction) {
    validateTransaction(transaction);
    const collection = db.collection("transactions");
    return collection.insertOne(parseTransaction(transaction));
  },
};
