const Movie = require('../Models/Movie');
const { isAuth } = require('../middlewares/auth');
const router = require('express').Router();

router.get('/', (req, res) => {
    Movie.find().then((movies) => {
        res.json(movies);
    });
});

router.post('/', isAuth, (req, res) => {
    let movie = new Movie(req.body);

    movie.save().then((createdMovie) => {
        res.status(201).json({ _id: createdMovie._id });
    });
});

module.exports = router;
