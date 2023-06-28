const Conversation = require('../../models/conversation');
const User = require('../../models/user');
const Profile = require('../../models/profile');

module.exports = {
    index,
    create,
    detail,
    update,
    newMsg
};

async function index(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        const convos = await Conversation.find({ profiles: { $in: [profile._id] } })
            .populate('profiles')
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

        const convo = await Conversation.create({ profiles: [profile, other] })
        res.json(convo);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function detail(req, res) {
    try {
        const convo = await Conversation.findOne({ user: req.params.id })
            .populate('profiles')
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
        const convo = await Conversation.findById(req.params.id);
        convo.messages.push(req.body.message);
        await convo.save();
    } catch (err) {
        res.status(400).json(err);
    }
}