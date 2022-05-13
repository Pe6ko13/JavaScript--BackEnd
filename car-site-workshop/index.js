const express = require('express');
const hbs = require('express-handlebars');

const initDb = require('./models/index');

const carService = require('./services/cars');
const accessoryService = require('./services/accessories');

const { about } = require('./controllers/about');
const create = require('./controllers/create');
const editCar = require('./controllers/edit');
const accessory = require('./controllers/accessory');
const deleteCar = require('./controllers/delete');
const { details } = require('./controllers/details');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');

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

    app.use(express.urlencoded({ extanded: true }));
    app.use('/static', express.static('static'));
    app.use(carService());
    app.use(accessoryService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);

    // app.route("/create").get(create.get).post(create.post);
    app.get('/create', create.get);
    app.post('/create', create.post);

    app.route('/edit/:id').get(editCar.get).post(editCar.post);
    app.route('/delete/:id').get(deleteCar.get).post(deleteCar.post);
    app.route('/accessory').get(accessory.get).post(accessory.post);

    app.all('*', notFound);

    app.listen(3000, () => console.log('server running'));
}
