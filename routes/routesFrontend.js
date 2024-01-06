const express = require("express");
const router = express.Router();

const dashboardRouter = require('./frontend/dashboard');
const landingRouter = require('./frontend/landing');

const apiRoutes = [
    {
        path: '/',
        route: dashboardRouter,
    },
    {
        path: '/',
        route: landingRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
module.exports = router;