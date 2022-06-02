const express = require('express');
const expressConfig = require('./config/express');

start();

async function start() {
    const app = express();

    expressConfig(app);

    app.listen(4000, () => 'Server running');
}
