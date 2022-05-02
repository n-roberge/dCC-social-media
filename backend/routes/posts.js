const {Post, validatePost} = require("../models/post");
const express = require("express");
const router = express.Router();

//GET all posts



//GET post by user

//PUT update a post

//DELETE a post
//http://localhost:3011/api/posts/
router.delete("/:id", async (req, res) => {
    try {
        let post = await Post.findByIdAndDelete(req.params.id);

        if (!post) return res.status(400).send(`Comment with id "${req.params.id}" does not exist!`);
        return res.send(post);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//POST new Post
//http://localhost:3011/api/posts
router.post("/", async (req, res) => {
    try {
        const {error} = validatePost(req.body)
        if (error) return res.status(400).send(error);

        let newPost = await new Post(req.body);
        await newPost.save();

        return res.status(201).send(newPost);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

module.exports = router;
