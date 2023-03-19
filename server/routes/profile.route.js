const express = require('express');

const router = express.Router();

const { GetUser, UpdateAvatar, findUser } = require('../controllers/profile.controllers');

router.route('/form').put(GetUser);
router.route('/form').get(findUser);

router.route('/avaterform').put(UpdateAvatar);

module.exports = router;
