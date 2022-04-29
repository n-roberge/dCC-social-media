const mongoose = require("mongoose");
const Joi = require("joi");
const {userSchema} = require("./user");

const postSchema = new mongoose.Schema({
  user: [userSchema],
  body: { type: String, required: true, minlength: 2 },
  like: { type: Boolean, required: true },
  dislike: { type: Boolean, required: true },
  dateAdded: { type: Date, default: Date.now() },
});

function validatepost(post) {
  const schema = Joi.object({
    body: Joi.string().required(),
    like: Joi.boolean().required(),
    dislike: Joi.boolean().required(),
  });
  return schema.validate(post);
}

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
  validatepost,
  postSchema,
};