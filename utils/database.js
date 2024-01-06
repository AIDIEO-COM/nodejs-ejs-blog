const sqlite3 = require('sqlite3').verbose();
const config = require('./config');
const tableQueries = require('./tables');
const bcrypt = require('bcrypt');

// Sample data for initial insertion
const userData = {
    name: config.ADMIN_NAME,
    email: config.ADMIN_EMAIL,
    password: config.ADMIN_PASS
};

const connectDB = async () => {
    global.db = new sqlite3.Database('./database.db', function (err) {
        if (err) {
            console.error(err);
            process.exit(1); // bail out we can't connect to the DB
        } else {
            console.log("Database connected");
            global.db.run("PRAGMA foreign_keys=ON");
        }
    });

    // Create tables
    await global.db.run(tableQueries.usersTableQuery);
    await global.db.run(tableQueries.blogTableQuery);
    await global.db.run(tableQueries.categoryTableQuery);

    // Check if the email already exists
    await global.db.get('SELECT * FROM users WHERE email = ?', [userData.email], (err, row) => {
        if (!row) {
            const hashedPassword = bcrypt.hashSync(userData.password, 10); //hashing the password
            global.db.run(tableQueries.userInsertQuery, [userData.name, userData.email, hashedPassword]);
        }
    });
}

module.exports = connectDB