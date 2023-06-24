const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSchema = new Schema({
    sender: Schema.Types.ObjectId,
    content: String
}, {
    timestamps: true
});

const conversationSchema = new Schema({
    users: [Schema.Types.ObjectId],
    messages: [msgSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Conversation', conversationSchema);