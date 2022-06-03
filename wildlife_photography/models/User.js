const { model, Schema } = require('mongoose');

const NAME_PATTERN = /^[a-zA-Z-]+$/;
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    firstName: {
        type: String,
        // required: true,
        minlength: [3, 'First name must be at least 3 characters long'],
        validate: {
            validator(value) {
                return NAME_PATTERN.test(value);
            },
            message: 'First name must contain only english letters',
        },
    },
    lastName: {
        type: String,
        minlength: [3, 'Last name must be at least 3 characters long'],
        validate: {
            validator(value) {
                return NAME_PATTERN.test(value);
            },
            message: 'Last name must contain only english letters',
        },
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email may contain only english letters',
        },
    },
    hashedPass: { type: String, required: true },
});

userSchema.index(
    { email: 1 },
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
