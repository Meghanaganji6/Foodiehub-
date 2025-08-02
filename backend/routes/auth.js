const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { registerUser, loginUser } = require("../controllers/authcontroller");
const { forgotPassword, resetPassword } = require("../controllers/authcontroller");
=======
const { registerUser, loginUser } = require("../controllers/authController");
const { forgotPassword, resetPassword } = require("../controllers/authController");
>>>>>>> 222382ab02d9d7d325e8f81cdb8b9929f5433e91

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


module.exports = router;
