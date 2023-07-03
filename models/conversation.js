const Message = require('./message');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    profiles: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
    lastMsg: {type: Schema.Types.ObjectId, ref: 'Message'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Conversation', conversationSchema);