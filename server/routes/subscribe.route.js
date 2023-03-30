const express = require('express');

const router = express.Router();

const ShowSubscribe = require('../controllers/subscribe.controllers');

router.route('/').get(ShowSubscribe);

module.exports = router;
