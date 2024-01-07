const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require('path');

const CreateBlog = require("../../controllers/blog/CreateBlog");
const GetBlogs = require("../../controllers/blog/GetBlogs");
const GetBlog = require("../../controllers/blog/GetBlog");
const UpdateBlog = require("../../controllers/blog/UpdateBlog");
const DeleteBlog = require("../../controllers/blog/DeleteBlog");

const auth = require("../../middleware/auth");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/files'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
})

let upload = multer({
    storage: storage
}).single("image")


// create a blog
router.post("/", upload, auth(true), CreateBlog);

// get single blog
router.get("/:id", GetBlog);

// get all blogs
router.get("/", GetBlogs);

// update blog
router.post("/update/:id", upload, auth(true), UpdateBlog);

// delete a blog
router.post("/delete/:id", auth(), DeleteBlog);

// Export the router object so index.js can access it
module.exports = router;
