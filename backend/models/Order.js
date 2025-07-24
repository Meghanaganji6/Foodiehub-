const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [String], // or [{dishId, qty}] for more detail
  user: String,
  status: { type: String, enum: ['preparing', 'done'], default: 'preparing' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);




