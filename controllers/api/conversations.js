const Conversation = require('../../models/conversation');
const User = require('../../models/user');

module.exports = {
    index,
    create,
    detail,
    update,
    newMsg
};

async function index(req, res) {
    try {
        const convos = await Conversation.find({ users: { $in: [req.user._id] } });
          // .populate('users').exec();
        //console.log(convos);
        res.json(convos);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

async function create(req, res) {
    try {
        const user = await User.findById(req.user._id);
        const person = await User.findOne({username: req.body.username});
        const newConvo = await Conversation.create({users: [user, person]});
        res.json(newConvo);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function detail(req, res) {

}

async function update(req, res) {
    
}

async function newMsg(req, res) {
    try {
        const convo = await Conversation.findById(req.params.id);
        convo.messages.push(req.body);
        await convo.save();
    } catch (err) {
        res.status(400).json(err);
    }
}