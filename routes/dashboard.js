const express = require("express");
const axios = require('axios');
const config = require("../utils/config");
const router = express.Router();

// dashboard page
router.get("/dashboard", (req, res) => {
    res.render("dashboard/dashboard.ejs", {
        url: req.protocol + "://" + req.headers.host,
        title: 'Dashboard',
    });
});

// category view page
router.get("/categories", async (req, res) => {
    try {
        const response = await axios.get(`${config.URL}api/v1/category`);
        const apiData = response.data;

        // Render the EJS template and pass data to it
        res.render("dashboard/category/categories.ejs", {
            url: req.protocol + "://" + req.headers.host,
            title: 'Dashboard | Categories',
            datas: apiData.data
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// category update page
router.get("/category/edit/:id", async (req, res) => {
    try {
        const response = await axios.get(`${config.URL}api/v1/category/${req.params.id}`);
        const apiData = response.data;

        // Render the EJS template and pass data to it
        res.render("dashboard/category/updateCategory.ejs", {
            url: req.protocol + "://" + req.headers.host,
            title: 'Dashboard | Edit Category',
            data: apiData.data
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// posts view page
router.get("/blogs", async (req, res) => {
    try {
        // Render the EJS template and pass data to it
        res.render("dashboard/blog/blogs.ejs", {
            url: req.protocol + "://" + req.headers.host,
            title: 'Dashboard | Blogs',
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// add blog view page
router.get("/blog/add", async (req, res) => {
    try {

        const response = await axios.get(`${config.URL}api/v1/category`);
        const apiData = response.data;

        // Render the EJS template and pass data to it
        res.render("dashboard/blog/addBlog.ejs", {
            url: req.protocol + "://" + req.headers.host,
            title: 'Dashboard | Add Blog',
            categories: apiData.data
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;