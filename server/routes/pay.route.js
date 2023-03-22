const express = require('express');

const router = express.Router();

const { PayUser } = require('../controllers/pay.controllers');

router.post('/', PayUser);

module.exports = router;
