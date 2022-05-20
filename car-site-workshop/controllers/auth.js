module.exports = {
    registerGet(req, res) {
        res.render('register', { title: 'Register' });
    },
    async registerPost(req, res) {
        if (
            req.body.username == '' ||
            req.body.password == '' ||
            req.body.password != req.body.repeatPassword
        ) {
            return res.redirect('/register');
        }

        try {
            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/');
        } catch (err) {
            res.redirect('/register');
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

    logoutGet(req, res) {},
};
