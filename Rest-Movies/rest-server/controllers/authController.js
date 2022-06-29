const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

router.post('/register', (req, res) => {
    let user = new User(req.body);

    user.save().then((createdUser) => {
        res.status(201).json({ _id: createdUser._id });
    });
});

router.post('/login', (req, res, next) => {
    const { login: username, password } = req.body;
    User.where(username, password)
        .findOne()
        .then((user) => {
            let token = jwt.sign(
                {
                    _id: user._id,
                    username: user.username,
                },
                'SOMESECRET',
                { expiresIn: '2h' }
            );

            res.status(200).json({
                _id: user._id,
                username: user.username,
                token,
            });
        })
        .catch((err) => {
            next({ status: 404, message: 'No such user or password' });
        });
});

module.exports = router;
