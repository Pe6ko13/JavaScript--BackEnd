const User = require('../models/User');
const { hash, compare } = require('bcrypt');

async function register(firstName, lastName, email, password) {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error('Username already exist');
    }

    const hashedPass = await hash(password, 10);

    const user = new User({
        firstName,
        lastName,
        email,
        hashedPass,
    });
    await user.save();
    return user;
}

async function login(email, password) {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('Wrong email or password');
    }

    const passMatch = await compare(password, user.hashedPass);
    if (!passMatch) {
        throw new Error('Wrong email or password');
    }

    return user;
}

async function getUserByEmail(email) {
    const user = await User.findOne({
        email: new RegExp(`^${email}$`, 'i'),
    });
    return user;
}

module.exports = {
    login,
    register,
};
