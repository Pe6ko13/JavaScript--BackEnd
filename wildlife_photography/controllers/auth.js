const { register, login } = require('../services/user');

const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        if (req.body.password != req.body.repass) {
            throw new Error("Passwords don't match");
        }

        const user = await register(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('register', { data: { firstName: req.body.firstName } });
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('login', { data: { firstName: req.body.firstName } });
    }
});

module.exports = router;
