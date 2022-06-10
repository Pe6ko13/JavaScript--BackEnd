const router = require('express').Router();
const api = require('../services/user');
const mapErrors = require('../utils.js/mappers');

router.post('/register', async (req, res) => {
    try {
        if (req.body.password.trim() == '' || req.body.email.trim() == '') {
            throw new Error('Email and password are required!');
        }

        const result = await api.register(
            req.body.email.trim().toLowerCase(),
            req.body.password.trim()
        );
        res.status(201).json(result);
    } catch (err) {
        const error = mapErrors(err);
        console.error(err.message);
        res.status(400).json({ message: error });
    }
});

router.post('/login', (req, res) => {
    console.log('login');
    res.end();
});

router.get('/logout', (req, res) => {
    console.log('logout');
    res.end();
});

module.exports = router;
