// createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/user"); // Adjust the path if needed

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const existing = await User.findOne({ email: "admin@foodiehub.com" });
    if (existing) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Admin",
      username: "admin",
      email: "admin@foodiehub.com",
      password: hashedPassword,
      role: "admin"
    });
    console.log("✅ Admin created successfully");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
