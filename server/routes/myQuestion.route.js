const express = require("express");
const router = express.Router();

const {
  findAndSupplyQuestion,
} = require("../controllers/myQuestion.controllers.js");

router.get("/", findAndSupplyQuestion);

module.exports = router;
