const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'Profile' },
    content: String
}, {
    timestamps: true
});

const conversationSchema = new Schema({
    profiles: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
    messages: [msgSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Conversation', conversationSchema);