// const { MongoClient } = require('mongodb');

// const connectionString = 'mongodb://localhost:27017';

// const connection = new MongoClient(connectionString, {
//   useUnifiedTopology: true,
// });

// connection.connect((err, res) => {
//   if (err != null) {
//     console.log('Error');
//     process.exit(1);
//   }

//   console.log('Connected');

//   const db = connection.db('testdb');
//   db.collection('people')
//     .find({})
//     .toArray((err, data) => {
//       console.log(data);
//     });
// });

const mongoose = require('mongoose');

const Car = require('./models/Car');
// require('./models/Car')
// const Car = mongoose.model('Car');

const connectionStr = 'mongodb://localhost:27017/testdb';

start();

async function start() {
  await mongoose.connect(connectionStr, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log('Connect');

  const car = new Car({
    name: 'BMW 320d',
    price: 20000,
  });
  await car.save();

  const data = await Car.find({});
  data.forEach((c) => c.getInfo());
  data.forEach((c) => c.console.log(car.VAT));
}
