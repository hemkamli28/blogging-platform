require('dotenv').config()
const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        const data = jwt.verify(token, process.env.SECRET);
        req.user = data.user;
        next();
        
    } catch (err) {
        console.error(err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "No Token Provided!" });
        }
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = {authUser};
