const express = require("express");
const CreateCategory = require("../../controllers/category/CreateCategory");
const GetCategories = require("../../controllers/category/GetCategories");
const GetCategory = require("../../controllers/category/GetCategory");
const UpdateCategory = require("../../controllers/category/UpdateCategory");
const DeleteCategory = require("../../controllers/category/DeleteCategory");
const router = express.Router();

// Create the 'category' table if it doesn't exist
global.db.run(`
    CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
    )
`);

// post a new category
router.post("/", CreateCategory);

// get single category
router.get("/:id", GetCategory);

// get all categories
router.get("/", GetCategories);

// update category
router.post("/update/:id", UpdateCategory);

// update category
router.post("/delete/:id", DeleteCategory);

// Export the router object so index.js can access it
module.exports = router;
