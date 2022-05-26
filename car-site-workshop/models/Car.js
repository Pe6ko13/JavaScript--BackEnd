const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const carSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Listing name is required'],
        minlength: [3, 'Listing name must be more than 3 letters'],
    },
    description: { type: String, default: '' },
    imageUrl: {
        type: String,
        default:
            'https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png',
        match: [/^https?:\/\//, 'Image URL must be a valid URL'],
    },
    price: { type: Number, required: true, min: 0 },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory' },
    idsDeleted: { type: Boolean, default: false },
    owner: { type: ObjectId, ref: 'User' },
});

const Car = model('Car', carSchema);

module.exports = Car;
