const express = require('express');
const router = express.Router();
const messagesCtrl = require('../../controllers/message/messages')

router.post("/", messagesCtrl.create);
router.get("/:chatId", messagesCtrl.recall);

module.exports = router;