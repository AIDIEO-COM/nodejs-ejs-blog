const express = require("express");
const Login = require("../../controllers/auth/Login");
const Logout = require("../../controllers/auth/Logout");
const router = express.Router();

// login route
router.post("/login", Login);
router.get("/logout", Logout);

// Export the router object so index.js can access it
module.exports = router;