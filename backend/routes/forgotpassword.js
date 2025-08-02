const express = require('express');
const router = express.Router();
const User = require('../models/ser');
const bcrypt = require('bcrypt');

// Step 1: Check if email exists
router.post('/verify-email', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not registered' });
    res.status(200).json({ message: 'Email verified' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Step 2: Reset password
router.post('/reset', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not registered' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
