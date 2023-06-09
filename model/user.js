const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, default: "consumer", required: true },
});

module.exports = mongoose.model("user", user);
