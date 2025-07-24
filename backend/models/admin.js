// models/Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: String, // or login credentials
  totalOrders: { type: Number, default: 0 }
});

module.exports = mongoose.model('Admin', AdminSchema);
