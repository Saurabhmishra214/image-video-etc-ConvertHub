const { getUserCollection } = require("./user.model");

async function createUser(req, res) {
  try {
    const userCollection = getUserCollection();

    const user = req.body;

    const result = await userCollection.insertOne(user);

    res.status(201).json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUsers(req, res) {
  try {
    const userCollection = getUserCollection();

    const users = await userCollection.find().toArray();

    res.json(users);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createUser, getUsers };
