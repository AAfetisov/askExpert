const express = require('express');

const router = express.Router();

const { Transactions, getTransactionsForQuestion } = require('../controllers/pay.controllers');

router.post('/', Transactions);
router.get('/question/:id', getTransactionsForQuestion);

module.exports = router;
