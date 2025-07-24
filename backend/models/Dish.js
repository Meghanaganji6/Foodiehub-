const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  veg: Boolean,
  imageUrl: String,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Dish', DishSchema);