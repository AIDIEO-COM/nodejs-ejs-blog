const express = require("express");
const Login = require("../controllers/auth/Login");
const router = express.Router();
const bcrypt = require('bcrypt');

// Sample data for initial insertion
const userData = {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: 'abcabc'
};

// Create the 'post' table if it doesn't exist
global.db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
`);

// Check if the email already exists
global.db.get('SELECT * FROM users WHERE email = ?', [userData.email], (err, row) => {
    if (!row) {
        // Email doesn't exist, insert the data
        const hashedPassword = bcrypt.hashSync(userData.password, 10);

        global.db.run(`
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `, [userData.name, userData.email, hashedPassword], (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('User data inserted successfully');
            }
        });
    }
});

// login route
router.post("/login", Login);

// Export the router object so index.js can access it
module.exports = router;