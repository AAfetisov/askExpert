const express = require('express');

const router = express.Router();

const ShowAllQuestions = require('../controllers/allQuestions.controllers');

router.route('/').get(ShowAllQuestions);

module.exports = router;
