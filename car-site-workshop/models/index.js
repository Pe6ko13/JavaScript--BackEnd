const mongoose = require('mongoose');

require('./Car');

const connectionStr = 'mongodb://localhost:27017/car-site-work';

async function init() {
    try {
        await mongoose.connect(connectionStr, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Database connected');

        // await Car.create({
        //     name: 'Toyota Avensis',
        //     description: '2015. 125000 km. Petrol. Automatic. Full service',
        //     imageUrl:
        //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAYUEK12fLVOBg2rftdcNjHtlbD-5kvWraPg&usqp=CAU%22',
        //     price: 16500,
        // });

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
