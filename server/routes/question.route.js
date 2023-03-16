const express = require('express');

const router = express.Router();

const { CreateQuestion } = require('../controllers/question.controllers');

router.route('/').post(CreateQuestion);

module.exports = router;
