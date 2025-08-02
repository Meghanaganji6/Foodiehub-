// backend/routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');

// GET /api/profile?email=user@example.com
router.get('/', profileController.getProfile);

module.exports = router;
