const express = require('express');

const router = express.Router();

const { PayOffer } = require('../controllers/pay.controllers');

router.post('/', PayOffer);

module.exports = router;
