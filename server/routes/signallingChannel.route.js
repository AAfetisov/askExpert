const express =require('express')

const router = express.Router()

const {receiveMessage, sendMessage} = require('../controllers/signallingChannel.controllers')

router.route('/')
.get(receiveMessage)
.post(sendMessage)


module.exports = router; 