const express = require("express");
const axios = require('axios');
const config = require("../utils/config");
const router = express.Router();
const { convert } = require('html-to-text')
const moment = require('moment')

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

// blogs view page
router.get("/blogs", async (req, res) => {
    try {

        const response = await axios.get(`${config.URL}api/v1/blog`);
        const apiData = response.data;

        // Render the EJS template and pass data to it
        res.render("dashboard/blog/blogs.ejs", {
            url: req.protocol + "://" + req.headers.host,
            title: 'Dashboard | Blogs',
            datas: apiData.data,
            convert: convert,
            moment: moment,
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

// category update page
router.get("/blog/edit/:id", async (req, res) => {
    try {
        const response = await axios.get(`${config.URL}api/v1/blog/${req.params.id}`);
        const apiData = response.data;

        const responseCat = await axios.get(`${config.URL}api/v1/category`);
        const apiDataCat = responseCat.data;

        console.log(apiData.data);

        // Render the EJS template and pass data to it
        res.render("dashboard/blog/updateBlog.ejs", {
            url: req.protocol + "://" + req.headers.host,
            title: 'Dashboard | Edit Blog',
            data: apiData.data,
            categories: apiDataCat.data,
            convert: convert
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;