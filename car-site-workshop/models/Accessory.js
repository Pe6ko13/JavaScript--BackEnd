const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const accessorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: {
        type: String,
        default:
            'https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png',
    },
    price: { type: Number, required: true, min: 0 },
    owner: { type: ObjectId, ref: 'User' },
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;
