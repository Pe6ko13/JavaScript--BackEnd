const Movie = require('../Models/Movie');
const { isAuth } = require('../middlewares/auth');
const router = require('express').Router();

router.post('/', isAuth, (req, res) => {
    console.log(req.body);
    let movie = new Movie(req.body);

    movie.save().then((createdMovie) => {
        res.status(201).json({ _id: createdMovie._id });
    });
});

module.exports = router;
