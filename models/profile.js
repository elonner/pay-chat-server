const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    username: { type: String, required: true },
    first: { type: String, required: true },
    last: { type: String, required: true },

    imgUrl: { type: String, required: true },
    activeConvo: { type: Schema.Types.ObjectId, default: null, ref: 'Conversation' }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Profile', profileSchema);