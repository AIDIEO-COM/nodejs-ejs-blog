const express = require("express");
const router = express.Router();

const GetProfile = require("../../controllers/profile/GetProfile");
const auth = require("../../middleware/auth");
const UpdateProfile = require("../../controllers/profile/UpdateProfile");

// login route
router.get("/", auth(), GetProfile);
router.post("/update", auth(true), UpdateProfile);

// Export the router object so index.js can access it
module.exports = router;