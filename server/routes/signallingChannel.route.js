const express = require('express');

const router = express.Router();

const { receiveMessage, sendMessage } = require('../controllers/signallingChannel.controllers');

router.route('/receive')
  .post(receiveMessage);

router.route('/send')
  .post(sendMessage);

module.exports = router;
