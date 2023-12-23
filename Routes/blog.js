const express = require('express');
const { getBlogs, addBlog, deleteBlog, updateBlog, searchBlog, getBlog } = require('../Controllers/blog');
const { authUser } = require('../Middlewares/authUser');
const { body } = require('express-validator');

const router = express.Router();

// Route to get all blogs
router.get('/all', getBlogs);

// Route to get an individual blog by ID
router.get('/individual/:blogId', getBlog);

// Route to add a new blog, requiring authentication and input validation
router.post('/new', authUser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Enter a valid data in description').isLength({ min: 5 }),
], addBlog);

// Route to delete a blog, requiring authentication
router.delete('/delete/:blogId', authUser, deleteBlog);

// Route to update a blog, requiring authentication and input validation
router.put('/update/:blogId', authUser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Enter a valid data in description').isLength({ min: 5 }),
], updateBlog);

// Route to search for blogs
router.get('/search', searchBlog);

module.exports = router;
