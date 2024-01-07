require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    URL: process.env.URL,

    ADMIN_NAME: process.env.ADMIN_NAME,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASS: process.env.ADMIN_PASS,

    TOKEN_SECRET: process.env.TOKEN_SECRET,
};