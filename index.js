/**
* index.js
* This is your main app entry point
*/

// Set up express, bodyparser and EJS
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const config = require('./utils/config');
const session = require("express-session")

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
// Items in the global namespace are accessible throught out the node application
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db', function (err) {
    if (err) {
        console.error(err);
        process.exit(1); // bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
    }
});

// Handle requests to the home page 
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// });

// Add all the route handlers in usersRoutes to the app under the path /users
const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const dashboardRoutes = require('./routes/dashboard');
const categoryRouter = require('./routes/categoryRouter');
const blogRouter = require('./routes/postRouter');

// ejs routes
app.use('/', loginRoutes);
app.use('/', dashboardRoutes);
app.use('/users', usersRoutes);

// api routes
app.use('/api/v1/', categoryRouter);
app.use('/api/v1/', blogRouter);


// Make the web application listen for HTTP requests
app.listen(config.PORT || 3000, () => {
    // console.log(`Example app listening on port ${port}`)
    console.log(`Listening on port http://localhost:${config.PORT}`);
})