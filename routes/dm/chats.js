const express = require('express');
const router = express.Router();
const chatsCtrl = require('../../controllers/chat/chats')

router.post('/', chatsCtrl.create)
module.exports = router;