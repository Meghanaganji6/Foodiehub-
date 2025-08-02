// backend/controllers/profile.js
const User = require('../models/user');

exports.getProfile = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
