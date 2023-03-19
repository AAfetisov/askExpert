const express = require('express');

const router = express.Router();

const {
  CreateQuestion, getQuestion, setQuestionCompleted, makeOffer, getOffer, getAllOffersForQuestion, getMessagesByQuestionBetweenTwoUsers,
} = require('../controllers/question.controllers');

router.route('/').post(CreateQuestion);
router.route('/:id').delete(setQuestionCompleted);
router.route('/:id').get(getQuestion);
router.route('/:id/offer').post(makeOffer);
router.route('/:id/offer').get(getOffer);
router.route('/:id/offers').get(getAllOffersForQuestion);
router.route('/:id/messages').post(getMessagesByQuestionBetweenTwoUsers);

module.exports = router;
