const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Importing mongodb Model
const user = require("../model/user");

// Register route
router.post("/register", async (req, res) => {
  // Checks for email and pass on req body
  if (req.body.email && req.body.password) {
    // Checks if email is already signed up
    if (await user.findOne({ email: req.body.email })) {
      res.sendStatus(403);
    } else {
      // Signup if not already signed up
      const newUser = new user({
        email: req.body.email,
        password: req.body.password,
      });

      try {
        await newUser.save();
        res.sendStatus(200);
      } catch (e) {
        console.log(e);
        res.status(400).json({
          error: e,
        });
      }
    }
  } else {
    res.sendStatus(400);
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Checks if user info is available on the DB
  const userObj = await user.findOne({ email });
  if (!userObj) {
    res.sendStatus(403);
  } else if (userObj.password !== password) {
    res.sendStatus(403);
  } else {
    // JWT sign and sending process if user creds are correct
    delete userObj.password;
    const token = await jwt.sign({ userObj }, process.env.jwtSecret);
    res.cookie("token", token);
    res.sendStatus(200);
  }
});

module.exports = router;
