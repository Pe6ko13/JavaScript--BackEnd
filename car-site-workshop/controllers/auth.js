const { body, validationResult } = require('express-validator');
const { Router } = require('express');
const { mapError } = require('../services/util');

const router = Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post(
    '/register',
    body('username').trim(),
    body('password').trim(),
    body('repeatPassword').trim(),
    body('username')
        .isLength({ min: 5 })
        .withMessage('Username must be at least 5 letters')
        .bail()
        .isAlphanumeric()
        .withMessage('Username must contain only letters and numbers'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 3 })
        .withMessage('Password must be at least 3 chars')
        .isAlphanumeric()
        .withMessage('Username must contain only letters and numbers'),
    body('repeatPassword')
        .custom((value, { req }) => value == req.body.password)
        .withMessage("Passwords dont't match"),

    async (req, res) => {
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
            res.locals.err = mapError(err);
            res.render('register', {
                title: 'Register',
                data: { username: req.body.username },
            });
        }
    }
);

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
    try {
        await req.auth.login(req.body.username, req.body.password);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.locals.err = [{ msg: err.message }];
        res.render('login', { title: 'Login' });
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;
