const express = require("express")
const router = express.Router()
const { Posts, Comments } = require("../models")
const Authenticate  = require("../protection/Authenticate")

router.get("/", Authenticate, async (req,res) =>{
    const allPosts = await Posts.findAll()
    res.json(allPosts);
});

router.get("/byId/:id", Authenticate, async (req,res) =>{
    console.log("console is finally here in endpoint");
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    const allComments = await Comments.findAll({
        where: {
          PostId: id, // Simple where condition
        },
      })
    debugger;
    console.log(allComments);
    let CommPost ={
        "post": post,
        "comments": allComments
    }
    console.log("thiss is the response i am returning", CommPost);
    res.json({
        status: 'success',
        message: 'User created successfully.',
        data: CommPost
    });
});

router.post("/", Authenticate, async (req, res) => {
    const post = req.body;
    console.log("this is backend request", post);
    await Posts.create(post);
    res.json(post);
});

module.exports = router;