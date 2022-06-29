const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    genres: { type: String, required: true },
    tickets: { type: Number, required: true },
});

module.exports = mongoose.model('Movie', movieSchema);
