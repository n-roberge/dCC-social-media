const mongoose = require("mongoose")

const friendSchema = mongoose.Schema({
   name :  { type: String, required: true, minLength: 5, maxLength: 50 },

});


const validateFriend = (friend) => {
   const schema = Joi.object({
     name: Joi.string().min(5).max(50).required(),
   });
   return schema.validate(friend);
 };

const Friend = mongoose.model("Friend", friendSchema);
module.exports.Friend = Friend;
module.exports.friendSchema = friendSchema;
module.exports.validateFriend = validateFriend;