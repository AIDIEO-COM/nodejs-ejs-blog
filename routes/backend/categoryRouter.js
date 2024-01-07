const express = require("express");
const CreateCategory = require("../../controllers/category/CreateCategory");
const GetCategories = require("../../controllers/category/GetCategories");
const GetCategory = require("../../controllers/category/GetCategory");
const UpdateCategory = require("../../controllers/category/UpdateCategory");
const DeleteCategory = require("../../controllers/category/DeleteCategory");
const auth = require("../../middleware/auth");
const router = express.Router();

// post a new category
router.post("/", auth(true), CreateCategory);

// get single category
router.get("/:id", auth(), GetCategory);

// get all categories
router.get("/", auth(), GetCategories);

// update category
router.post("/update/:id", auth(true), UpdateCategory);

// update category
router.post("/delete/:id", auth(), DeleteCategory);

// Export the router object so index.js can access it
module.exports = router;
