const express = require('express');

const router = express.Router();

const { Transactions } = require('../controllers/pay.controllers');

router.post('/', Transactions);

module.exports = router;
