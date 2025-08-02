const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String, 
    required: true 
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

// ✅ Prevent OverwriteModelError on repeated imports
module.exports = mongoose.models.User || mongoose.model("User", userSchema);

