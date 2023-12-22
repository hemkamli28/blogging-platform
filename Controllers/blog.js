const Blog = require("../Models/blog");
const { validationResult } = require('express-validator');


const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        return res.status(200).json({ blogs, success: true, message: "Blogs Fetched!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, message: "Internal Server error!", });
    }
}

const addBlog = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description } = req.body;
        const user = req.user.email;
        const blog = new Blog({ user, title, description });
        await blog.save();
        return res.status(201).json({ blog, success: true, message: "Blog added Successfully!" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, message: "Internal Server error!", });
    }
}

const updateBlog = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const blogId = req.params.blogId;

        const { title, description } = req.body;
        const blog = await Blog.findById(blogId);
        if (blog.user !== req.user.email) {
            return res.status(401).json({ success: false, message: 'Permission Denied!' });
        }
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, description }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: 'blog not found' });
        }
        return res.status(200).json({ updatedBlog, success: true, message: 'Blog updated successfully!', });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message, message: "Internal Server error!", });
    }
}


const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Blog.findById(blogId);
        if (blog.user !== req.user.email) {
            return res.status(401).json({ success: false, message: 'Permission Denied!' });
        }
        const deletedBlog = await Blog.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found!' });
        }
        return res.status(200).json({ deletedBlog, success: true, message: 'Blog Deleted successfully!', });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message, message: "Internal Server error!", });
    }
}

const searchBlog = async (req, res) => {
    try {
        const { blogTitle } = req.query;
        const blog = await Blog.find({ title: blogTitle });
        if (!blog || blog.length === 0) {
            return res.status(404).json({ success: false, message: "Blog Not Found! " });
        }
        else
            return res.status(200).json({ blog, success: true, message: "Blog Found! " });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message, message: "Internal Server error!", });
    }
}

const getBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Blog.findById(blogId);
        return res.status(200).json({ blog, success: true, message: "Blog Found!" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message, message: "Internal Server error!", });
    }
}


module.exports = { getBlogs, getBlog, addBlog, updateBlog, deleteBlog, searchBlog }