const assert = require("assert");
const { ObjectID } = require("mongodb");

function validateCategory(category) {
  assert(typeof category.name === "string", "Category name must be a string.");
  assert(
    typeof category.order === "number" || category.order === "",
    "Category order must be a number or an empty string."
  );
}

function parseCategory(category) {
  return {
    name: category.name,
    order: category.order === "" ? null : category.order,
  };
}

module.exports = {
  getAllCategories(db) {
    const collection = db.collection("categories");
    return collection.find().toArray();
  },
  getCategory(db, id) {
    const collection = db.collection("categories");
    return collection.findOne({ _id: new ObjectID(id) });
  },
  newCategory(db, category) {
    validateCategory(category);
    const collection = db.collection("categories");
    return collection.insertOne(parseCategory(category));
  },
  editCategory(db, id, category) {
    validateCategory(category);
    const collection = db.collection("categories");
    return collection.updateOne(
      { _id: new ObjectID(id) },
      { $set: parseCategory(category) }
    );
  },
  deleteCategory(db, id) {
    const collection = db.collection("categories");
    return collection.deleteOne({ _id: new ObjectID(id) });
  },
};
