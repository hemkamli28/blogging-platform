const express = require('express');
const { getUsers, registerUser, loginUser } = require('../Controllers/user');
const { body} = require('express-validator');

const router = express.Router();

router.get('/all', getUsers);

router.post('/register',
    [
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'Enter a Strong Password with minimum 7 characters').isLength({ min: 7 })
    ], registerUser);

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be empty').exists()
], loginUser);

module.exports = router;