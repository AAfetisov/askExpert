const express = require('express');
const router = express.Router();

const {checkUserAndCreateSession,createNewUserAndSession,destroySession,validateSession} =require('../controllers/auth.controllers.js')

router.route('/').get(validateSession);
router.route('/signin').post(checkUserAndCreateSession);
router.route('/signup').post(createNewUserAndSession)
router.route('/signout').delete(destroySession);

module.exports = router;