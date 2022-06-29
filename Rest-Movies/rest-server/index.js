const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
// const cors = require('cors');      //need to install 'cors' library
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/softuni-movies', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('DB Connected');
});

app.use(cors);
app.use(express.json());
app.use('/api', routes);

app.listen(5000, () => console.log('Server is listening on port: 5000'));
