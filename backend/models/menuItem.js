const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ["breakfast", "lunch", "snacks", "drinks"], required: true },
  description: { type: String },
  available: { type: Boolean, default: true },
  stock: { type: Number, default: 100 },
  imageUrl: { type: String } // optional
}, { timestamps: true });

module.exports = mongoose.model("MenuItem", menuItemSchema);
