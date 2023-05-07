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
module.exports = {
    create,
}