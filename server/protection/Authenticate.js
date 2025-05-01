const jwt = require("jsonwebtoken");
const express = require("express")
const dotenv = require('dotenv');
dotenv.config();


const SECRET_KEY = process.env.JWT_SECRET_KEY; // Load the secret key from .env

const Authenticate = (req, res, next) => {
    // const token = req.headers["Authorization"];
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // "Bearer <token>"
    console.log('Received token:', token);
    debugger;
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Access Denied: No Token Provided",
      });
    }
    try {
        console.log("the console is here");
    //   const verified = jwt.verify(token, process.env.JWT_SECRET);
    //   req.user = verified; // Attach the user payload to the request
    console.log(SECRET_KEY);
    console.log(token);
    const decoded = jwt.verify(token, SECRET_KEY); // Replace SECRET_KEY with your actual key
    console.log("the console is here after the decoding");

    console.log('Decoded Token:', decoded);
    req.user = decoded; // Attach the decoded token to the request object
    next(); // Call the next middleware or route handler
    } catch (error) {
      return res.status(403).json({
        status: "error",
        message: "Invalid Token",
      });
    }
}

module.exports = Authenticate;
