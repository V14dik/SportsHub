const express = require("express");
const app = express();
const mongoose = require("mongoose");

const config = require("./config.json");
const addUser = require("./controllers/user.controller");

mongoose.pluralize(null);
mongoose.set("strictQuery", false);

app.get("/", (req, res) => {
  res.send("Main page");
});

app.get("/add", (req, res) => {
  addUser({ username: "name", email: "qwesg@mail.com" });
  res.json("New user added!");
});

app.listen(config.port, async () => {
  try {
    await mongoose.connect(config.DBUrl);
    console.log(`Server listening on port ${config.port}`);
  } catch (err) {
    console.log(err);
  }
});
