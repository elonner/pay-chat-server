const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, required: true, ref: 'Profile' },
    recipient: { type: Schema.Types.ObjectId, required: true, ref: 'Profile' },
    conversation: { type: Schema.Types.ObjectId, required: true, ref: 'Conversation' },
    content: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', msgSchema);