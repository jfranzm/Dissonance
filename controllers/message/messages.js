const Message = require("../../models/message");

// create new messages
async function create(req, res) {
    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(err) {
        res.status(500).json(err)
    }
};

// get previously sent messages
async function recall(req, res) {
    try {
        const messages = await Message.find({
            chatId: req.params.chatId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    create,
    recall,
}