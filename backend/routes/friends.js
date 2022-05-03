const { User, validateLogin, validateUser } = require("../models/user");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const express = require("express");
const router = express.Router();



// PUT Friend
router.put("/:userId/newfriend", [auth, admin], async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user)
        return res
          .status(400)
          .send(`User with id ${req.params.userId} does not exist!`);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  
    try {
      let user = await User.findByIdAndUpdate(
          req.params.id, //req.body.name
          {
            friendsList: [...req.body.friendsList],
          },
          {new:true}
        );
        return res.send(user);
      
      }catch(ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  //TODO: GET FriendsList
  router.get("/:userId/friendslist", [auth, admin], async (req, res) => {
    try {
      const friendsList = await User.find({userId: req.params.userId});
      if (!friendsList)
        return res
          .status(400)
          .send(`User with id ${req.params.userId} does not exist!`);
      return res.send(friendsList);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  // PUT Friend Request
  router.put("/:userId/requests", async (req, res) => {
    try {
      const friends = await User.updateOne(
        { _id: req.body._id },
        { $addToSet: { friendRequests: req.body.friendRequests } }
      );
      if (friends)
        return res
          .status(201)
          .send(`Friend with ID of ${req.body.friendRequests} added`);
      return res.status(400).send(`Error adding friend`);
    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  });

  module.exports = router;