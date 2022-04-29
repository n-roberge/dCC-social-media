const mongoose = require("mongoose")

const friendschema = mongoose.Schema({
   name :  { type: String, required: true, minLength: 5, maxLength: 50 },

});

const Friend = mongoose.models.Friend || mongoose.model("Friend" , friendschema);
module.exports.Friend = Friend;
module.exports.friendSchema = friendSchema;
