const User = require('../models/User');
const { hash, compare } = require('bcrypt');

async function register(username, password) {
    const existingUser = await getUserByName(username);
    if (existingUser) {
        throw new Error('Username already exist');
    }

    const hashedPass = await hash(password, 10);

    const user = new User({
        username,
        hashedPass,
    });
    await user.save();
    return user;
}

async function login(username, password) {
    const user = await getUserByName(username);
    if (!user) {
        throw new Error('Wrong username or password');
    }

    const passMatch = await compare(password, user.hashedPass);
    if (!passMatch) {
        throw new Error('Wrong username or password');
    }

    return user;
}

async function getUserByName(username) {
    const user = await User.findOne({ username });
    return user;
}

module.exports = {
    login,
    register,
};
