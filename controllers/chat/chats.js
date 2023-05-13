const Chat = require("../../models/chat");

async function create(req, res) {
    const newChat = new Chat({
        members:[req.body.senderId, req.body.receiverId]
    });

    try {
        const savedChat = await newChat.save();
        res.status(200).json(savedChat);
    }catch(err) {
        res.status(500).json(err)
    }
}

async function recall(req, res) {
    try {
        const chat = await Chat.find({
            members: {$in: [req.params.userId]},
        });
        res.status(200).json(chat);
    } catch(err) {
        res.status(500).json(err);
    }
}
module.exports = {
    create,
    recall,
}