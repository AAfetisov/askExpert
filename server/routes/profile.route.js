const express = require('express');

const router = express.Router();

const {
  GetUser, FindCurrentUser, findUser, GetRating,
} = require('../controllers/profile.controllers');

router.route('/form').put(GetUser);
router.route('/form').get(findUser);

router.route('/:id').get(FindCurrentUser);

module.exports = router;
