/**
 * users.js
 * These are example routes for user management
 * This shows how to correctly structure your routes for the project
 * and the suggested pattern for retrieving data by executing queries
 *
 * NB. it's better NOT to use arrow functions for callbacks with the SQLite library
* 
 */

const express = require("express");
const router = express.Router();

/**
 * @desc Displays a page with a form for creating a user record
 */
router.get("/", (req, res) => {
    res.render("login.ejs", {
        url: req.protocol + "://" + req.headers.host
    });
});


// Export the router object so index.js can access it
module.exports = router;