const express = require("express")
const router = express.Router()
const { Comments } = require("../models")
const Authenticate  = require("../protection/Authenticate")


router.get("/:postId", Authenticate, async (req,res) =>{
    const postId = req.params.postId;
    const Comment = await Comments.findAll({where: {postId: postId }});
    res.json(Comment);
});

router.post("/", Authenticate, async (req, res) => {
    const comment = req.body;
    console.log("this is backend request", comment);
    await Comments.create(comment);

    const allComments = await Comments.findAll({
        where: {
          PostId: req.body.PostId, // Simple where condition
        },
      })
    res.status(201).json({
        status: 'success',
        message: 'User created successfully.',
        data: allComments
    });
});

module.exports = router