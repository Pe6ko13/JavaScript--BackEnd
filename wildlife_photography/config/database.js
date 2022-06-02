const mongoose = require('mongoose');

const databaseName = 'wildlife';

const connectionStr = `mongodb://localhost:27017/${databaseName}`;

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionStr, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false,
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
};
