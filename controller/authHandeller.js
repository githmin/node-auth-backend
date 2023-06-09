const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const user = require("../model/user");

router.post("/register", async (req, res) => {
  if (req.body.email && req.body.password) {
    if (await user.findOne({ email: req.body.email })) {
      res.sendStatus(403);
    } else {
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userObj = await user.findOne({ email });

  if (!userObj) {
    res.sendStatus(403);
  } else if (userObj.password !== password) {
    res.send("Invalid Password");
  } else {
    delete userObj.password;
    const token = await jwt.sign({ userObj }, process.env.jwtSecret);
    res.cookie("token", token);
    res.sendStatus(200);
  }
});

module.exports = router;
