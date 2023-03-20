const express = require('express');

const router = express.Router();

const { addUserRating } = require('../controllers/rating.controllers');

router.route('/:id').post(addUserRating);

module.exports = router;
