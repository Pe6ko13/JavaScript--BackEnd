const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true },
    hashedPass: { type: String, required: true },
});

userSchema.index(
    { username: 1 },
    {
        unique: true,
        collation: {
            locale: 'en',
            strength: 2,
        },
    }
);

const User = model('User', userSchema);

module.exports = User;
