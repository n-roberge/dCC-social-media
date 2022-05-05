const mongoose = require("mongoose")

const friendSchema = mongoose.Schema({
   //refId: objectID, ref: "User"
   name :  { type: String, required: true, minLength: 5, maxLength: 50 },
   status: {
      type: Number,
      enums: [
          0,    //'add friend',
          1,    //'requested',
          2,    //'pending',
          3,    //'friends'
      ]
    }
});

const validateFriend = (friend) => {
   const schema = Joi.object({
     name: Joi.string().min(5).max(50).required(),
     status: Joi.number().greater(-1).less(4)
   });
   return schema.validate(friend);
 };

const Friend = mongoose.model("Friend", friendSchema);
module.exports.Friend = Friend;
module.exports.friendSchema = friendSchema;
module.exports.validateFriend = validateFriend;