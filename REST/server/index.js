const express = require('express');
const mongoose = require('mongoose');
const catalogController = require('./controllers/catalog');
const usersController = require('./controllers/users');

const cors = require('./middlewares/cors');

start();

async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017/furniture', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log('Database ready');
    } catch (err) {
        console.error('Database connection failed');
        process.exit(1);
    }

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use('/data/catalog', catalogController);
    app.use('/users', usersController);

    app.listen(3030, () => console.log('Server is runing'));
}
