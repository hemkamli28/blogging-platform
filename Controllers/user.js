const User = require("../Models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users, success: true, message: "users found!"});

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message , message: "Internal Server error!",});
    }
}

const registerUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async (err, hashedPassword) => {

            const user = new User({ email, password: hashedPassword });
            const data = {
                user: {
                    email: user.email,
                }
            }
            try {
                const token = jwt.sign(data, process.env.SECRET)
                const existingUser = await User.find({ email })
                if (existingUser.length > 0) {
                    return res.status(409).json({ success: false, message: "User already exist!" });
                }
                await user.save();
                return res.status(201).json({ user, token, success: true, message: "Users Crerated successfully!" });
            }

            catch (err) {
                return res.status(500).json({ error: err, success: false, message: "User Failed to create!",  });
            }
        });
    });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({ success: false, message: "Please Enter Correct Credentials" });
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(500).json({ success: false, message: "Please Enter Correct Credentials" });
        }

        const data = {
            user: {
                email: user.email,
            }
        }
        const token = jwt.sign(data, process.env.SECRET);
        return res.status(200).json({ success: true, token, message: "Login Successful!" });

    } catch (error) {
        return res.status(500).json({ success: false, error: error });
    }
}



module.exports = { getUsers, registerUser, loginUser }