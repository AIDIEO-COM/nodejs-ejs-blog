const express = require("express");
const router = express.Router();

const Login = require("../../controllers/auth/Login");
const Logout = require("../../controllers/auth/Logout");
const Signup = require("../../controllers/auth/Signup");

// login route
router.post("/login", Login);
router.post("/signup", Signup);
router.get("/logout", Logout);

// Export the router object so index.js can access it
module.exports = router;