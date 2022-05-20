const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');

const initDb = require('./models/index');

const carService = require('./services/cars');
const accessoryService = require('./services/accessories');
const authService = require('./services/auth');

const { about } = require('./controllers/about');
const create = require('./controllers/create');
const editCar = require('./controllers/edit');
const accessory = require('./controllers/accessory');
const attach = require('./controllers/attach');
const deleteCar = require('./controllers/delete');
const { details } = require('./controllers/details');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');
const {
    registerGet,
    registerPost,
    loginGet,
    loginPost,
    logout,
} = require('./controllers/auth');
const { isLoggedIn } = require('./services/util');

start();

async function start() {
    await initDb();

    const app = express();

    // const handlebars = hbs.create({extname: '.hbs'})

    app.engine(
        'hbs',
        hbs.create({
            extname: '.hbs',
        }).engine
    );
    app.set('view engine', '.hbs');

    app.use(
        session({
            secret: 'my super secret',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: 'auto' },
        })
    );

    app.use(express.urlencoded({ extanded: true }));
    app.use('/static', express.static('static'));
    app.use(carService());
    app.use(accessoryService());
    app.use(authService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);

    // app.route("/create").get(create.get).post(create.post);
    app.get('/create', isLoggedIn(), create.get);
    app.post('/create', isLoggedIn(), create.post);

    app.route('/edit/:id')
        .get(isLoggedIn(), editCar.get)
        .post(isLoggedIn(), editCar.post);
    app.route('/delete/:id')
        .get(isLoggedIn(), deleteCar.get)
        .post(isLoggedIn(), deleteCar.post);
    app.route('/accessory')
        .get(isLoggedIn(), accessory.get)
        .post(isLoggedIn(), accessory.post);
    app.route('/attach/:id')
        .get(isLoggedIn(), attach.get)
        .post(isLoggedIn(), attach.post);
    app.route('/register').get(registerGet).post(registerPost);
    app.route('/login').get(loginGet).post(loginPost);
    app.get('/logout', isLoggedIn(), logout);

    app.all('*', notFound);

    app.listen(3000, () => console.log('server running'));
}
