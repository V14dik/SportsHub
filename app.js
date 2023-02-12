const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bp = require("body-parser");

const config = require("./config.json");
const UserController = require("./controllers/user.controller");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);

app.get("/", (req, res) => {
  res.send("Main page");
});

app.post("/auth/user", UserController.register);

app.get("/users", UserController.getUsers);

app.get("/users:id", UserController.getUser);

app.listen(config.port, async () => {
  try {
    await mongoose.connect(config.DBUrl);
    console.log(`Server listening on port ${config.port}`);
  } catch (err) {
    console.log(err);
  }
});
