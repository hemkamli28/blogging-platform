const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

