const router = require('express').Router();
const { isGuest } = require('../middlewares/guards');
const api = require('../services/user');
const mapErrors = require('../utils.js/mappers');

router.post('/register', isGuest(), async (req, res) => {
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

router.post('/login', isGuest(), async (req, res) => {
    try {
        const result = await api.login(
            req.body.email.trim().toLowerCase(),
            req.body.password.trim()
        );
        res.json(result);
    } catch (err) {
        const error = mapErrors(err);
        console.error(err.message);
        res.status(400).json({ message: error });
    }
});

router.get('/logout', (req, res) => {
    api.logout(req.user?.token);
    res.status(204).end();
});

module.exports = router;
