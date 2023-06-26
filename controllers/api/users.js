const User = require('../../models/user');
const Conversation = require('../../models/conversation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    index,
    detail,
    update
};

async function create(req, res) {
    try {
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function update(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!!req.body.activeConvo) user.activeConvo = req.body.activeConvo._id;
        await user.save();
        res.json(user)
    } catch (err) {
        res.status(400).json(err);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) throw new Error();
        // Check if the password matches
        console.log('here');
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        res.json(createJWT(user));
    } catch {
        res.status(400).json('Bad Credentials');
    }
}

async function index(req, res) {
    try {
        const people = await User.find({ _id: { $ne: req.user._id } })
        res.json(people);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function detail(req, res) {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}

//==============================================

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}