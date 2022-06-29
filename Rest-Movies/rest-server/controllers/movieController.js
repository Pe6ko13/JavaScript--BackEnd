const Movie = require('../Models/Movie');

const router = require('express').Router();

router.post('/', (req, res) => {
    console.log(req.body);
    let movie = new Movie(req.body);

    movie.save().then((createdMovie) => {
        res.status(201).json({ _id: createdMovie._id });
    });
});

module.exports = router;
