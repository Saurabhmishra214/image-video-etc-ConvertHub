const express = require("express");
const router = express.Router();

const { createUser, getUsers } = require("./user.controller");

router.post("/", createUser);
router.get("/", getUsers);

module.exports = router;
