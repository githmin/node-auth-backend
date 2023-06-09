const express = require("express");
const router = express.Router();

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

module.exports = router;
