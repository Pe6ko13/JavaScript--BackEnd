const { Schema, model } = require('mongoose');

const carSchema = new Schema({
  name: { type: String, required: [true, 'Car name is a must'] }, // name is required!
  price: Number,
});

carSchema.methods.getInfo = function () {
  console.log(`${this.name} costs: $${this.price}`); // add custom methods to the class
};

// create virtual variable (getter or setter):
carSchema
  .virtual('VAT')
  .get(function () {
    return this.price * 0.2;
  })
  .set(function () {
    this.price;
  });

// add validator for the price
carSchema.path('price').validate(function (value) {
  return value >= 0;
}, 'Price cannot be negative!');

const Car = model('Car', carSchema); // create class Car on carSchema configurations and methods

module.exports = Car;
