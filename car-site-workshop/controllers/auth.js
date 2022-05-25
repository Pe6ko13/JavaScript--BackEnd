const { validationResult } = require('express-validator');

module.exports = {
    registerGet(req, res) {
        res.render('register', { title: 'Register' });
    },

    async registerPost(req, res) {
        const { errors } = validationResult(req);

        // if (
        //     req.body.username == '' ||
        //     req.body.password == '' ||
        //     req.body.password != req.body.repeatPassword
        // ) {
        //     return res.redirect('/register');
        // }

        try {
            if (errors.length > 0) {
                throw errors;
            }
            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.render('register', {
                title: 'Register',
                err,
                data: { username: req.body.username },
            });
        }
    },

    loginGet(req, res) {
        res.render('login', { title: 'Login' });
    },

    async loginPost(req, res) {
        try {
            await req.auth.login(req.body.username, req.body.password);
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.redirect('/login');
        }
    },

    logout(req, res) {
        req.auth.logout();
        res.redirect('/');
    },
};
