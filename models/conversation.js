const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    profiles: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
}, {
    timestamps: true
});

module.exports = mongoose.model('Conversation', conversationSchema);