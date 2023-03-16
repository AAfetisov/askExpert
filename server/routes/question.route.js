const express = require('express');

const router = express.Router();

const { CreateQuestion, getQuestion, setQuestionCompleted } = require('../controllers/question.controllers');

router.route('/').post(CreateQuestion);
router.route('/:id').delete(setQuestionCompleted);
router.route('/:id').get(getQuestion);

module.exports = router;
