const express = require('express');

const router = express.Router();

const {
  CreateQuestion, getQuestion, setQuestionCompleted, makeOffer, getOffer, getAllOffersForQuestion,
} = require('../controllers/question.controllers');

router.route('/').post(CreateQuestion);
router.route('/:id').delete(setQuestionCompleted);
router.route('/:id').get(getQuestion);
router.route('/:id/offer').post(makeOffer);
router.route('/:id/offer').get(getOffer);
router.route('/:id/offers').get(getAllOffersForQuestion);

module.exports = router;
