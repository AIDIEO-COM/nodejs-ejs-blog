const express = require("express");
const multer = require("multer");
const CreateBlog = require("../controllers/blog/CreateBlog");
const router = express.Router();
const path = require('path');
const GetBlogs = require("../controllers/blog/GetBlogs");
const GetBlog = require("../controllers/blog/GetBlog");
const UpdateBlog = require("../controllers/blog/UpdateBlog");
const DeleteBlog = require("../controllers/blog/DeleteBlog");

// Create the 'post' table if it doesn't exist
global.db.run(`
    CREATE TABLE IF NOT EXISTS blog (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
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


// create a blog
router.post("/blog", upload, CreateBlog);

// get single blog
router.get("/blog/:id", GetBlog);

// get all blogs
router.get("/blog", GetBlogs);

// update blog
router.post("/blog/update/:id", upload, UpdateBlog);

// delete a blog
router.post("/blog/delete/:id", DeleteBlog);

// Export the router object so index.js can access it
module.exports = router;
