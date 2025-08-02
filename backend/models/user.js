const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true 
<<<<<<< HEAD
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
=======
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
    enum: ["student","admin"],
>>>>>>> 222382ab02d9d7d325e8f81cdb8b9929f5433e91
    default: "student"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
<<<<<<< HEAD
}, { timestamps: true });

// ✅ Prevent OverwriteModelError on repeated imports
module.exports = mongoose.models.User || mongoose.model("User", userSchema);

=======

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
>>>>>>> 222382ab02d9d7d325e8f81cdb8b9929f5433e91
