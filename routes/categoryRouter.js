const express = require("express");
const CreateCategory = require("../controllers/category/CreateCategory");
const GetCategories = require("../controllers/category/GetCategories");
const GetCategory = require("../controllers/category/GetCategory");
const router = express.Router();

// Create the 'category' table if it doesn't exist
global.db.run(`
    CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE
    )
`);

// post a new category
router.post("/category", CreateCategory);

// get all categories
router.get("/category", GetCategories);

// get single category
router.get("/category/:id", GetCategory);

// Export the router object so index.js can access it
module.exports = router;
