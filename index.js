require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.port || 3001;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
