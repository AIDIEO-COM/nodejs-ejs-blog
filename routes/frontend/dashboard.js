const express = require("express");
const axios = require('axios');
const config = require("../../utils/config");
const router = express.Router();
const { convert } = require('html-to-text')
const moment = require('moment');
const RequireLogin = require("../../middleware/RequireLogin");
const { axiosGET } = require("../../utils/axios/axios");

// dashboard page
router.get("/dashboard", RequireLogin, (req, res) => {

    const user = req.session.user;
    const isAuthenticated = req.session.isAuthenticated;

    res.render("dashboard/dashboard", {
        url: req.protocol + "://" + req.headers.host,
        title: 'Dashboard',
        user,
        isAuthenticated
    });
});

// category view page
router.get("/categories", RequireLogin, async (req, res) => {
    try {

        // get logged value
        const isAuthenticated = req.session.isAuthenticated;
        const token = req.session.token;

        // get the categories
        const response = await axiosGET('category', token);

        // Render the EJS template and pass data to it
        res.render("dashboard/category/categories", {
            url: req.protocol + "://" + req.headers.host,
            title: 'Dashboard | Categories',
            datas: response,
            isAuthenticated,
            token,
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// category update page
router.get("/category/edit/:id", RequireLogin, async (req, res) => {
    try {

        // get logged value
        const isAuthenticated = req.session.isAuthenticated;
        const token = req.session.token;

        // get the specific category
        const response = await axiosGET(`category/${req.params.id}`, token);

        // Render the EJS template and pass data to it
        res.render("dashboard/category/updateCategory", {
            url: req.protocol + "://" + req.headers.host,
            title: 'Dashboard | Edit Category',
            data: response,
            isAuthenticated,
            token,
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// blogs view page
router.get("/blogs", RequireLogin, async (req, res) => {
    try {

        // get logged value
        const isAuthenticated = req.session.isAuthenticated;
        const token = req.session.token;

        // get blogs
        const response = await axiosGET(`blog`, token);

        // Render the EJS template and pass data to it
        res.render("dashboard/blog/blogs", {
            url: req.protocol + "://" + req.headers.host,
            title: 'Dashboard | Blogs',
            datas: response,
            convert: convert,
            moment: moment,
            isAuthenticated,
            token,
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// add blog view page
router.get("/blog/add", RequireLogin, async (req, res) => {
    try {

        // get logged value
        const isAuthenticated = req.session.isAuthenticated;
        const token = req.session.token;

        // get blogs
        const response = await axiosGET(`category`, token);

        // Render the EJS template and pass data to it
        res.render("dashboard/blog/addBlog", {
            url: req.protocol + "://" + req.headers.host,
            title: 'Dashboard | Add Blog',
            categories: response,
            isAuthenticated,
            token,
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// category update page
router.get("/blog/edit/:id", RequireLogin, async (req, res) => {
    try {

        // get logged value
        const isAuthenticated = req.session.isAuthenticated;
        const token = req.session.token;

        // get the specific blog
        const response = await axiosGET(`blog/${req.params.id}`, token);

        // get categories
        const responseCat = await axiosGET('category', token);

        // Render the EJS template and pass data to it
        res.render("dashboard/blog/updateBlog", {
            url: req.protocol + "://" + req.headers.host,
            title: 'Dashboard | Edit Blog',
            data: response,
            categories: responseCat,
            convert: convert,
            isAuthenticated,
            token,
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;