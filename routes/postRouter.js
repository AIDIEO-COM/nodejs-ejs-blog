const express = require("express");
const multer = require("multer");
const CreatePost = require("../controllers/post/CreatePost");
const router = express.Router();
const path = require('path');

// Create the 'post' table if it doesn't exist
global.db.run(`
    CREATE TABLE IF NOT EXISTS blog (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        category_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES category(id)
    )
`);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/files'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
})

let upload = multer({
    storage: storage
}).single("image")


// create a post
router.post("/blog", upload, CreatePost);

// get single category
// router.get("/category/:id", GetCategory);

// // get all categories
// router.get("/category", GetCategories);

// // update category
// router.post("/category/update/:id", UpdateCategory);

// // update category
// router.post("/category/delete/:id", DeleteCategory);

// Export the router object so index.js can access it
module.exports = router;
