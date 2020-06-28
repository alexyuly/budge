const assert = require("assert");
const { ObjectID } = require("mongodb");

function validateCategory(category) {
  assert(
    typeof category.name === "string" && category.name.trim(),
    "Category name must be a non-empty string."
  );
  assert(
    !isNaN(category.order === "number"),
    "Category order must be a valid number"
  );
}

function parseCategory(category) {
  return {
    name: category.name.trim(),
    order: category.order === "" ? null : Number(category.order),
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
