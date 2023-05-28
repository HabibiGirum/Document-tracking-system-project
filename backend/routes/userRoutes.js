const express = require("express");
const router = express.Router();
const {
  loginUser,
  logoutUser,
  registerUser,
} = require("../controllers/userController");

// Login route
router.post("/login", loginUser);

// Logout route
router.post("/logout", logoutUser);

// Register route
router.post("/register", registerUser);

module.exports = router;
