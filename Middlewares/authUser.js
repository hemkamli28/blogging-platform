require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware for authenticating users
const authUser = async (req, res, next) => {
    // Extract the token from the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        // Verify the token using the secret key
        const data = jwt.verify(token, process.env.SECRET);

        // Attach user data to the request for use in subsequent middleware or route handlers
        req.user = data.user;

        // Call the next middleware or route handler
        next();
    } catch (err) {
        console.error(err);

        // Handle different JWT errors
        if (err.name === 'JsonWebTokenError') {
            // Unauthorized: No token provided
            return res.status(401).json({ message: "No Token Provided!" });
        }
        // Forbidden: Invalid token
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = { authUser };
