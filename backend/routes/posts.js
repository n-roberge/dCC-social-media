const {Post, validatePost} = require("../models/post");
const express = require("express");
const router = express.Router();

//GET all posts
router.get("/", async (req, res) => {
    try {
      // console.log(req.post);
      const posts = await Post.find();
      if (!posts) return res.status(400).send(`No posts available`);
      return res.send(posts);
    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  });

//GET post by user
router.get("/:id", async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (!post) return res.status(400).send(`Comment with id "${req.params.id}" does not exist!`);
        return res.send(post);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//PUT update a post
router.put("/:id", async (req, res) => {
    try {
        let post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                body: req.body.body,
                like: req.body.like,
                dislike: req.body.dislike,
            },
            {new:true}
        );
        if (!post) return res.status(400).send(`Post with id "${req.params.id}" does not exist!`);
        return res.send(post);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//DELETE a post
//http://localhost:3011/api/posts/
router.delete("/:id", async (req, res) => {
    try {
        let post = await Post.findByIdAndDelete(req.params.id);

        if (!post) return res.status(400).send(`Post with id "${req.params.id}" does not exist!`);
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
