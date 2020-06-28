const assert = require("assert");
const { ObjectID } = require("mongodb");

function validatePerson(person) {
  assert(
    typeof person.name === "string" && person.name.trim(),
    "Person name must be a non-empty string."
  );
  assert(
    !isNaN(person.order === "number"),
    "Person order must be a valid number"
  );
}

function parsePerson(person) {
  return {
    name: person.name.trim(),
    order: Number(person.order),
  };
}

module.exports = {
  getAllPeople(db) {
    const collection = db.collection("people");
    return collection.find().toArray();
  },
  getPerson(db, id) {
    const collection = db.collection("people");
    return collection.findOne({ _id: new ObjectID(id) });
  },
  newPerson(db, person) {
    validatePerson(person);
    const collection = db.collection("people");
    return collection.insertOne(parsePerson(person));
  },
  editPerson(db, id, person) {
    validatePerson(person);
    const collection = db.collection("people");
    return collection.updateOne(
      { _id: new ObjectID(id) },
      { $set: parsePerson(person) }
    );
  },
  deletePerson(db, id) {
    const collection = db.collection("people");
    return collection.deleteOne({ _id: new ObjectID(id) });
  },
};
