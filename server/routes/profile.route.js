const express = require('express');

const router = express.Router();

const {
  GetUser, FindCurrentUser, findUser, findUserInfo
} = require('../controllers/profile.controllers');

router.route('/').get(findUserInfo);
router.route('/form').put(GetUser);
router.route('/form').get(findUser);

router.route('/:id').get(FindCurrentUser);

module.exports = router;
