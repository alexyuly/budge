const assert = require("assert");
const { ObjectID } = require("mongodb");
const parseHtmlCheckboxes = require("./helpers/parseHtmlCheckboxes");

function validateBudget(budget) {
  assert(
    typeof budget.name === "string" && budget.name.trim(),
    "Budget name must be a non-empty string."
  );
  assert(
    !isNaN(budget.order === "number"),
    "Budget order must be a valid number"
  );
  // TODO Validate person_id_list?
}

function parseBudget(budget) {
  return {
    name: budget.name.trim(),
    order: Number(budget.order),
    person_id_list: parseHtmlCheckboxes(budget, "person_"),
  };
}

module.exports = {
  getAllBudgets(db) {
    const collection = db.collection("budgets");
    return collection.find().toArray();
  },
  getBudget(db, id) {
    const collection = db.collection("budgets");
    return collection.findOne({ _id: new ObjectID(id) });
  },
  newBudget(db, budget) {
    validateBudget(budget);
    const collection = db.collection("budgets");
    return collection.insertOne(parseBudget(budget));
  },
  editBudget(db, id, budget) {
    validateBudget(budget);
    const collection = db.collection("budgets");
    return collection.updateOne(
      { _id: new ObjectID(id) },
      { $set: parseBudget(budget) }
    );
  },
  deleteBudget(db, id) {
    const collection = db.collection("budgets");
    return collection.deleteOne({ _id: new ObjectID(id) });
  },
};
