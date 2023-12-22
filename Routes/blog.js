const express = require('express');
const { getBlogs, addBlog, deleteBlog, updateBlog, searchBlog, getBlog } = require('../Controllers/blog');
const { authUser } = require('../Middlewares/authUser');
const { body} = require('express-validator');

const router = express.Router();

router.get('/all', getBlogs);
router.get('/individual/:blogId', getBlog);

router.post('/new', authUser, [
    body('title','Enter a valid Title').isLength({ min: 3 }),
    body('description','Enter a valid data in description').isLength({ min: 5 }),

],addBlog);

router.delete('/delete/:blogId', authUser,deleteBlog);

router.put('/update/:blogId', authUser,  [
    body('title','Enter a valid Title').isLength({ min: 3 }),
    body('description','Enter a valid data in description').isLength({ min: 5 }),

],updateBlog);

router.get('/search' , searchBlog);


module.exports = router;