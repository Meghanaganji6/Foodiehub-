const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// For demo: hardcoded admin user
const ADMIN = {
  username: 'admin',
  password: bcrypt.hashSync('admin123', 10) // store hashed password
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === ADMIN.username &&
    bcrypt.compareSync(password, ADMIN.password)
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;