const { User, validateLogin, validateUser } = require("../models/user");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

//* POST register a new user
router.post("/register", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send(`Email ${req.body.email} already claimed!`);

    const salt = await bcrypt.genSalt(10);
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      isAdmin: req.body.isAdmin,
    });

    await user.save();
    const token = user.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// POST a valid login attempt
// when a user logs in, a new JWT token is generated and sent if their email/password credentials are correct
router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`Invalid email or password.`);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    return res.send(token);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// Get all users
router.get("/", [auth], async (req, res) => {
  try {
    console.log(req.user);
    const users = await User.find();
    return res.send(users);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// DELETE a single user from the database
router.delete("/:userId", [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    await user.remove();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//GET user by ID
router.get("/:userId", [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// EDIT user
router.put("/:userId", [auth, admin], async (req, res) => {
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
          name: req.body.name,
          email: req.body.email,
          about: req.body.about,
          friendsList: req.body.friendsList,
        },
        {new:true}
      );
      return res.send(user);
    
    }catch(ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});
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
