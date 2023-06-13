require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authHandeller = require("./controller/authHandeller");
// Do not remove passportSetup
const passportSetup = require("./controller/passport");
const passport = require("passport");
const authRoute = require("./routes/Oauth");
const cookieSession = require("cookie-session");

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

const port = process.env.port || 3001;

// Middleware
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// Connection to DB
const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose
    .connect(process.env.dbUrl)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log("Error Occured", err);
    });
};

// Auth Route
app.use("/api/auth", authHandeller);
// OAuth2 Setup
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

// Implemented this way to deploy on serverless
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
});
