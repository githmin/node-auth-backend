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
  })
);
app.use(express.json());

// Connection to DB
const mongoose = require("mongoose");
mongoose
  .connect(process.env.dbUrl)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("Error Occured", err);
  });

app.use("/api/auth", authHandeller);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
