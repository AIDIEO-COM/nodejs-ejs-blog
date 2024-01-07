const express = require("express");
const router = express.Router();

const authRouter = require('./backend/authRouter');
const profileRouter = require('./backend/profileRouter');
const categoryRouter = require('./backend/categoryRouter');
const blogRouter = require('./backend/blogRouter');

const apiRoutes = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/profile',
        route: profileRouter,
    },
    {
        path: '/category',
        route: categoryRouter,
    },
    {
        path: '/blog',
        route: blogRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
module.exports = router;