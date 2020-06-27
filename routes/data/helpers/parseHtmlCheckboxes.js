const { ObjectID } = require("mongodb");

module.exports = function parseHtmlCheckboxes(formData, prefix) {
  return Object.keys(formData)
    .filter((key) => key.startsWith(prefix))
    .map((key) => new ObjectID(key.slice(prefix.length)));
};
