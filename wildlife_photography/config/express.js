const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');

module.exports = (app) => {
    app.engine('.hbs', handlebars.create({ extname: '.hbs' }).engine);
    app.set('view engine', '.hbs');

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));

    app.use(
        session({
            secret: 'secret',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: 'auto' },
        })
    );
};
