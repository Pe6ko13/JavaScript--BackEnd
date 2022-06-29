const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let authorizationHeader = req.get('X-Authorization');
    if (authorizationHeader) {
        let token = authorizationHeader.split(' ')[1];

        try {
            let decoded = jwt.verify(token, 'SOMESECRET');
            req.user = decoded;
        } catch (error) {
            return next();
        }
    }

    next();
}

function isAuth(req, res, next) {
    if (!req.user) {
        res.status(401).json({ errorData: 'You cannot perform this acyion' });
    }

    next();
}

module.exports = { auth, isAuth };
