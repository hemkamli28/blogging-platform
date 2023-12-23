require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectToMongo = require('./db');
const path = require('path');
const fs = require('fs');
const https = require('https');
const rateLimit = require('express-rate-limit');
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require('./Routes/user');
const blogRoutes = require('./Routes/blog');
const Blog = require('./Models/blog');

// Connect to MongoDB
connectToMongo();

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Enable JSON parsing
app.use(express.json());

// Enable CORS
app.use(cors());

// Route for unauthorized users to view all blog posts
app.get("/", async (req, res) => {
    try {
        // Fetch all blogs
        const blogs = await Blog.find();
        return res.status(200).json({ blogs, success: true, message: "Blogs Fetched!" });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ success: false, message: error.message, message: "Internal Server error!" });
    }
});

// User routes
app.use('/api/user', userRoutes);

// Blog routes
app.use('/api/blog', blogRoutes);

// Create an HTTPS server with SSL/TLS certificates
const httpsServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')) 
}, app);

// Start the server
httpsServer.listen(port, () => {
    console.log(`Listening on port ${port} (HTTPS)`);
});

// Note: Make sure to replace 'cert/key.pem' and 'cert/cert.pem'
// with the actual paths to your SSL certificate and private key files.
