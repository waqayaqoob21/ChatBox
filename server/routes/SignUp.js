const express = require("express")
const router = express.Router()
const { Users } = require("../models")

router.post("/", async (req, res) => {
    const user = req.body;
    await Users.create(user);
    res.status(201).json({
        status: 'success',
        message: 'User created successfully.',
        data: user
    });
});

module.exports = router;