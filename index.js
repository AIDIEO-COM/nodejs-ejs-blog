/**
* index.js
* This is your main app entry point
*/

// Set up express, bodyparser and EJS
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const config = require('./utils/config');
const connectDB = require('./utils/database');
const session = require("express-session");

const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// session setup
app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false
}))

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

// set ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up SQLite
connectDB();

// Add all the route handlers in usersRoutes to the app under the path /users
const routersFrontend = require('./routes/routesFrontend');
const routersBackend = require('./routes/routesBackend');

// all routes
app.use('/', routersFrontend);
app.use('/api/v1', routersBackend);

// files route
app.use('/public', express.static('public'))

// Make the web application listen for HTTP requests
app.listen(config.PORT || 3000, () => {
    console.log(`Listening on port http://localhost:${config.PORT}`);
})