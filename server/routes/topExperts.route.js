const express = require('express');

const router = express.Router();

const ShowTopExperts = require('../controllers/topExperts.controllers');

router.route('/').get(ShowTopExperts);

module.exports = router;
