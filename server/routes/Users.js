const express = require("express")
const router = express.Router()
const { Users } = require("../models")

router.get("/", async (req,res) =>{
    const allUsers = await Users.findAll()
    res.status(200).json({
        status: 'success',
        message: 'User data fetched successfully.',
        data: allUsers
    });
});


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