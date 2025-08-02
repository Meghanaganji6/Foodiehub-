const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authcontroller");
const { forgotPassword, resetPassword } = require("../controllers/authcontroller");

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


module.exports = router;
