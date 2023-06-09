const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const user = require("../model/user");

router.post("/register", async (req, res) => {
  const newUser = new user({
    email: req.body.email,
    password: req.body.password,
    userType: req.body.userType,
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
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userObj = await user.findOne({ email });

  if (!userObj) {
    res.sendStatus(403);
  }

  if (userObj.password !== password) {
    res.send("Invalid Password");
  }

  delete userObj.password;
  const token = await jwt.sign({ userObj }, process.env.jwtSecret);
  res.cookie("token", token);
  res.sendStatus(200);
});
module.exports = router;
