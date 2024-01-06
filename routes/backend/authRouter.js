const express = require("express");
const Login = require("../../controllers/auth/Login");
const router = express.Router();

// login route
router.post("/login", Login);

// Export the router object so index.js can access it
module.exports = router;