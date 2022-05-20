const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: {
        type: String,
        default:
            'https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png',
    },
    price: { type: Number, required: true, min: 0 },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory' },
    idsDeleted: { type: Boolean, default: false },
    owner: { type: ObjectId, ref: 'User' },
});

const Car = model('Car', carSchema);

module.exports = Car;
