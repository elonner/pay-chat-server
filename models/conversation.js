const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSchema = new Schema({
    sender: Schema.Types.ObjectId,
    content: String
}, {
    timestamps: true
});

const conversationSchema = new Schema({
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    messages: [msgSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Conversation', conversationSchema);