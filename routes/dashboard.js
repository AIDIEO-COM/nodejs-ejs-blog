const express = require("express");
const axios = require('axios');
const config = require("../utils/config");
const router = express.Router();

// dashboard page
router.get("/dashboard", (req, res) => {
    res.render("dashboard/dashboard.ejs", {
        url: req.protocol + "://" + req.headers.host
    });
});

router.get("/categories", async (req, res) => {
    try {
        const response = await axios.get(`${config.URL}api/v1/category`);
        const apiData = response.data;

        // Render the EJS template and pass data to it
        res.render("dashboard/category/categories.ejs", {
            url: req.protocol + "://" + req.headers.host,
            datas: apiData.data
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;