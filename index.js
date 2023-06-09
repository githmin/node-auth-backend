require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.port || 3001;

const cors = require("cors");

const authHandeller = require("./controller/authHandeller");
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://auth-frontend-react.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
);
app.use(express.json());

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

app.use("/api/auth", authHandeller);

app.get("/", (req, res) => {
  res.send("hello");
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
});
