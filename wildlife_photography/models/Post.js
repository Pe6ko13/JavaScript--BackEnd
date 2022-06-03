const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const URL = /^https?:\/\/(.+)/;

const postSchema = new Schema({
    title: {
        type: String,
        minlength: [3, 'Title must be at least 3 chars long'],
    },
    keyword: {
        type: String,
        minlength: [3, 'Keyword must be at least 3 chars long'],
    },
    location: {
        type: String,
        maxlength: [3, 'Location must be max 3 chars long'],
    },
    date: {
        type: String,
        minlength: [10, 'Date must be 10 chars long'],
        maxlength: [10, 'Date must be 10 chars long'],
    },
    image: {
        type: String,
        validate: {
            validator(value) {
                return URL.test(value);
            },
            message: 'Image must be a valid URL',
        },
    },
    description: {
        type: String,
        minlength: [10, 'Description must be at least 10 chars long'],
    },
    author: { type: ObjectId, ref: 'User', required: true },
    votes: { type: [ObjectId], ref: 'User', default: [] },
    rating: { type: Number, default: 0 },
});

const Post = model('Post', postSchema);

module.exports = Post;
