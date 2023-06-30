const Conversation = require('../../models/conversation');
const User = require('../../models/user');
const Message = require('../../models/message');
const Profile = require('../../models/profile');

module.exports = {
    index,
    create,
    detail,
    update,
    newMsg,
    messages
};

async function index(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        const convos = await Conversation.find({ profiles: { $in: [profile._id] } })
            .populate({
                path: 'profiles',
                populate: { path: 'user' }
            })
            .exec();
        res.json(convos);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function create(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        const other = await Profile.findOne({ username: req.body.username });

        const existingConversation = await Conversation.findOne({
            profiles: { $all: [profile._id, other._id] }
        });
        if (existingConversation) {
            return res.status(400).json({ message: 'Conversation already exists' });
        }

        const convo = await Conversation.create({ profiles: [profile, other] });
        await convo
            .populate({
                path: 'profiles',
                populate: { path: 'user' }
            });
        res.json(convo);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

async function detail(req, res) {
    try {
        const convo = await Conversation.findOne({ user: req.params.id })
            .populate({
                path: 'profiles',
                populate: { path: 'user' }
            })
            .exec();
        res.json(convo);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function update(req, res) {

}

async function newMsg(req, res) {
    try {
        // console.log(req.body);
        const message = await Message.create(req.body.message);
        await message.populate('sender recipient conversation');
        res.json(message);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function messages(req, res) {
    try {
        const messages = await Message.find({ conversation: req.params.id })
            .populate('sender recipient conversation')
            .exec();
        res.json(messages);
    } catch (err) {
        res.status(400).json(err);
    }
}