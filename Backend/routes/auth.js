const express = require("express");
const router = express.Router();
const User = require("../models/authentication");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const bcrypt = require("bcryptjs");

// require("dotenv").config();
const JWT_SECRET = "monkey";

// Router1: this is a login router fuction for both admin and user
router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    // user email comparing
    if (!user) {
      return res.status(401).json({
        status: false,
        error: "Please try to login with correct credentials",
      });
    }
    // password checking and comparing with data
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCompare) {
      return res.status(401).json({
        status: false,
        error: "Please try to login with correct credentials",
      });
    }
    /// jwt tokent convert
    const data = {
      user: {
        id: user.id,
        username:user.username,
        role: user.role,
      },
    };
    // console.log(data);
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ status: true, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Router2: this is to create users by admin either admin or user to create
router.post("/createcredentials", async (req, res) => {
  try {
    // Check if the username already exists in the database
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(401).json({
        status: false,
        error: "Sorry a user with this Username is already exists",
      });
    }

    //   hash and salt for the password
    const salt = await bcrypt.genSalt(5);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // create a new collection in database
    user = await User.create({
      username: req.body.username,
      password: secPass,
      role: req.body.role,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    // sending tocken to admin
    res.json({ status: true, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Router3: delete the users authentication by admin access only
router.delete("/dprofile/:id", fetchuser, async (req, res) => {
  try {
    // default admin id can't be deleted
    if (req.params.id == "65d5bc9072141dea43a5afaa") {
      return res.status(401).send("You can't delete this profile credentials");
    }

    // Find the User id to be delete auth
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(401).send("Not Found");
    }

    // check either admin or not because admin can delete user and
    userrole = req.user.role;
    if (userrole !== "admin") {
      return res.status(500).send("Your can't access this");
    }
    // deleted the creadentials
    user = await User.findByIdAndDelete(req.params.id);
    res.json({ status: "User has been deleted", user: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 5 : update all user and admin auth
router.put("/uprofile/:id", fetchuser, async (req, res) => {
  const { role } = req.body;
  // default admin id can't be deleted
  if (req.params.id == "65d5bc9072141dea43a5afaa") {
    return res.status(401).send("You can't delete this profile credentials");
  }
  try {
    userrole = req.user.role;
    // check for the admin role
    if (userrole !== "admin") {
      return res.status(500).send("Your can't access this");
    }
    // assining note to add role type
    const newNote = {};
    if (role) {
      newNote.role = role;
    }
    // fetching details of user by id
    let userpro = await User.findById(req.params.id);
    if (!userpro) {
      return res.status(404).send("Not Found");
    }
    // update the user role by admin
    userpro = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ userpro });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Router6: user can see there profile using this router
router.get("/getuser", fetchuser, async (req, res) => {
  // fetching data after login to page. it fetch user details without password and data
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select(["-password", "-date"]);
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
