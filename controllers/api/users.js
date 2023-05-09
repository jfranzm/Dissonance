const User = require('../../models/user');
const { createJWT, isValidPassword } = require('../../helpers/auth')

async function create (req, res, next){
    try{
        const user = await User.create(req.body);
        const token = createJWT(user)
        res.json(token)
    }catch(err){
        res.status(400).json(err);
    }
}

async function login(req, res, next) {
    try {
        const pw = req.body.password;
        const username = req.body.username;

        const user = await User.findOne({username})

        if(user && isValidPassword(pw, user.password)){
            const token = createJWT(user)
            res.json(token)
        }else{
            res.status(400).json("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).json("Invalid Credentials");
    }
}

function checkToken(req, res) {
    console.log('req.user', req.user);
    res.json(req.exp);
}

async function updateUser(req, res) {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can only update your account!");
    }
}

async function deleteUser(req, res) {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can only delete your account!");
    }
};

async function friendUser(req, res) {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.friends.includes(req.body.userId)) {
                await user.updateOne({$push: {friends: req.body.userId}});
                await currentUser.updateOne({$push: {friends: req.params.id}});
                res.status(200).json("user has been added as a friend");
            } else {
                res.status(403).json("you are already friends with this user");
            }
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can't be friends with yourself");
    }
};

async function unfriendUser(req, res){
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.params.userId);
            if (user.friends.includes(req.body.userId)) {
                await user.updateOne({$pull: {friends: req.body.userId}});
                await currentUser.updateOne({$pull: {friends: req.params.id}});
                res.status(200).json("you are not longer friends with this user");
            } else {
                res.status(403).json("you're not friends with this user");
            }
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can't unfriend yourself")
    }
}

async function userInfo(req, res) {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ? await User.findById(userId) : await User.findOne({username: username});
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch(err) {
        res.status(500).json(err)
    }
}

module.exports = {
    create,
    login,
    checkToken,
    updateUser,
    deleteUser,
    friendUser,
    unfriendUser,
    userInfo,
}