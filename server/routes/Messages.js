const express = require("express")
const router = express.Router()
const { ChatBox } = require("../models")
const Authenticate  = require("../protection/Authenticate")


router.get("/byId/:id", Authenticate, async (req,res) =>{
    const receiverId = req.params.id;

    console.log("finally console is here for messages of user", receiverId);
    const messages = await ChatBox.findAll({where: {receiverId: receiverId }});
    res.status(201).json({
        status: 'success',
        message: 'Messages of this users successfully fetched.',
        data: messages
    });
});

// router.post("/", Authenticate, async (req, res) => {
//     const comment = req.body;
//     console.log("this is backend request", comment);
//     await Comments.create(comment);

//     const allComments = await Comments.findAll({
//         where: {
//           PostId: req.body.PostId, // Simple where condition
//         },
//       })
//     res.status(201).json({
//         status: 'success',
//         message: 'User created successfully.',
//         data: allComments
//     });
// });

module.exports = router