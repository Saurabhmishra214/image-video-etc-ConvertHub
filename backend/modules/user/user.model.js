const { getDB } = require("../../config/connection");

function getUserCollection() {
  const db = getDB();
  return db.collection("users");
}

module.exports = { getUserCollection };
