const mongoose = require('mongoose');

require('./Car');

const connectionStr = 'mongodb://localhost:27017';

async function init() {
    try {
        await mongoose.connect(connectionStr, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        });
    } catch (err) {
        console.error('Cannot connect to database');
        process.exit(1);
    }
}

module.exports = init;
