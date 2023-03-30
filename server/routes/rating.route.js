const express = require('express');

const router = express.Router();

const { addUserRating } = require('../controllers/rating.controllers');

router.route('/').post(addUserRating);

module.exports = router;
