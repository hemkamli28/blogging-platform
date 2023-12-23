const express = require('express');
const { getUsers, registerUser, loginUser } = require('../Controllers/user');
const { body } = require('express-validator');

const router = express.Router();

// Route to get all users
router.get('/all', getUsers);

// Route to register a new user, requiring email validation and strong password validation
router.post('/register', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a Strong Password with minimum 7 characters').isLength({ min: 7 })
], registerUser);

// Route to login a user, requiring email validation and checking for the existence of a password
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be empty').exists()
], loginUser);

module.exports = router;
