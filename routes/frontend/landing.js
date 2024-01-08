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
const { convert } = require('html-to-text')
const moment = require('moment')
const axios = require('axios');
const config = require("../../utils/config");
const LoggedIn = require("../../middleware/LoggedInn");

/**
 * @desc Displays a home page
 */
router.get("/", async (req, res) => {

    const isAuthenticated = req.session.isAuthenticated;

    const response = await axios.get(`${config.URL}api/v1/blog`);
    const apiData = response.data;

    res.render("landing/home", {
        url: req.protocol + "://" + req.headers.host,
        title: 'Home',
        datas: apiData.data,
        convert: convert,
        moment: moment,
        isAuthenticated,
    });
});

/**
 * @desc Displays a page for article details
 */
router.get("/articale/:id", async (req, res) => {
    try {

        const isAuthenticated = req.session.isAuthenticated;

        const response = await axios.get(`${config.URL}api/v1/blog/${req.params.id}`);
        const apiData = response.data;

        // Render the EJS template and pass data to it
        res.render("landing/blogDetails", {
            url: req.protocol + "://" + req.headers.host,
            title: `Blog Details | ${apiData.data.title}`,
            data: apiData.data,
            moment: moment,
            convert: convert,
            isAuthenticated
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * @desc Displays a login page
 */
router.get("/login", LoggedIn, (req, res) => {
    res.render("landing/login", {
        url: req.protocol + "://" + req.headers.host
    });
});

/**
 * @desc Displays a login page
 */
router.get("/signup", LoggedIn, (req, res) => {
    res.render("landing/signup", {
        url: req.protocol + "://" + req.headers.host
    });
});


// Export the router object so index.js can access it
module.exports = router;