/**
* index.js
* This is your main app entry point
*/

// Set up express, bodyparser and EJS
const express = require('express');
const path = require('path');
const config = require('./utils/config');

const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views')); // set the app to use ejs for rendering
app.set('view engine', 'ejs'); // set the app to use ejs for rendering
app.use(express.static(path.join(__dirname, 'public'))); // set location of static files

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

app.use('/', loginRoutes);
app.use('/', dashboardRoutes);
app.use('/users', usersRoutes);


// Make the web application listen for HTTP requests
app.listen(config.PORT || 3000, () => {
    // console.log(`Example app listening on port ${port}`)
    console.log(`Listening on port http://localhost:${config.PORT}`);
})