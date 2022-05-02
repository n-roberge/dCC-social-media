const mongoose = require("mongoose");
const Joi = require("joi");
const {userSchema} = require("./user");

const postSchema = new mongoose.Schema({
  user: { type: String, required: true}, //userId here or [userSchema]?
  body: { type: String, required: true, minlength: 2 },
  like: { type: Boolean, default: false },
  dislike: { type: Boolean, default: false },
  dateAdded: { type: Date, default: Date.now() },
});

function validatePost(post) {
  const schema = Joi.object({
    user: Joi.string().required(),
    body: Joi.string().required(),
    like: Joi.boolean(),
    dislike: Joi.boolean(),
  });
  return schema.validate(post);
}

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
  validatePost,
  postSchema,
};