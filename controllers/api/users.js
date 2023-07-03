const User = require('../../models/user');
const Profile = require('../../models/profile');
const Conversation = require('../../models/conversation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    index,
    available,
    detail,
    setActiveConvo
};

async function create(req, res) {
    const { username, password, first, last, imgUrl } = req.body;
    try {
        const user = await User.create({ username, password });
        const profile = await Profile.create({ user: user._id, username, first, last, imgUrl });
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function setActiveConvo(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.params.id });
        if (!!req.body.activeConvo) profile.activeConvo = req.body.activeConvo._id;
        await profile
            .populate({
                path: 'activeConvo',
                populate: {
                    path: 'profiles',
                    populate: {
                        path: 'user'
                    }
                }
            });
        await profile.save();
        res.json(profile)
    } catch (err) {
        res.status(400).json(err);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) throw new Error();
        // Check if the password matches
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        res.json(createJWT(user));
    } catch {
        res.status(400).json('Bad Credentials');
    }
}

async function index(req, res) {
    try {
        const profiles = await Profile.find({ user: { $ne: req.user._id } })
            .populate({
                path: 'activeConvo',
                populate: {
                    path: 'profiles',
                    populate: {
                        path: 'user'
                    }
                }
            })
            .exec();
        res.json(profiles);
    } catch (err) {
        res.status(400).json(err);
    }
}


// can prolly get rid of this
async function available(req, res) {
    try {
        // const profiles = await Profile.find({ user: { $ne: req.user._id } })
        //     .populate('activeConvo')
        //     .exec();
        // res.json(profiles);

        const currProfile = await Profile.findOne({ user: req.user._id });
        const existingConvos = await Conversation.find({
            profiles: { $all: [currProfile._id] }
        }).distinct('profiles');
        const excludedProfiles = existingConvos.map(profileId =>
            profileId.toString()
        );

        const profiles = await Profile.find({
            user: { $ne: req.user._id },
            _id: { $nin: excludedProfiles }
        })
            .populate({
                path: 'activeConvo',
                populate: {
                    path: 'profiles',
                    populate: {
                        path: 'user'
                    }
                }
            })
            .exec();

        res.json(profiles);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function detail(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.params.id })
            .populate({
                path: 'activeConvo',
                populate: {
                    path: 'profiles',
                    populate: {
                        path: 'user'
                    }
                }
            })
            .exec();
        res.json(profile);
    } catch (err) {
        console.log(err);
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