const express = require("express")
const router = express.Router()
const { Users } = require("../models")
const jwt = require("jsonwebtoken"); // Import JWT library
const dotenv = require('dotenv');
dotenv.config();



// Generate a random secret key
const SECRET_KEY = process.env.JWT_SECRET_KEY; // Load the secret key from .env

router.post("/", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'Email and password are required.'
        });
    }
    try{
    // Find user by email
    const user = await Users.findOne({ where: { email, password } });
    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found.'
        });
    }


    // Generate JWT token
        const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username }, // Payload (user data)
        SECRET_KEY, // Secret key
        { expiresIn: "24h" } // Token validity
    );


    // Verify password
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    //     if (!isPasswordValid) {
    //         return res.status(401).json({
    //             status: 'error',
    //             message: 'Invalid password.'
    //         });
    //     }

    // Success response
    res.status(200).json({
        status: 'success',
        message: `Welcome, ${user.username}!`,
        token,
        data: user,
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Server error.',
        });
    }

});



module.exports = router;