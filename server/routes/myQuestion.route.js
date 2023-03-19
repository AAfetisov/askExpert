const express = require('express');

const router = express.Router();

const {
  findAndSupplyQuestion,
} = require('../controllers/myQuestion.controllers');

router.get('/', findAndSupplyQuestion);

module.exports = router;
