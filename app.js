const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bp = require("body-parser");
const cors = require("cors");

const config = require("./config.json");
const UserController = require("./controllers/user.controller");
const ArticleController = require("./controllers/article.controller");
const checkAuth = require("./middleware/checkAuth");

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);

app.get("/", (req, res) => {
  res.send("Main page");
});

app.post("/auth/registration", UserController.register);

app.post("/auth/user", UserController.signIn);

app.get("/users", UserController.getUsers);

app.get("/users:id", UserController.getUser);

app.post("/article", checkAuth, ArticleController.addArticle);

app.get("/articles", ArticleController.getArticles);

app.listen(config.port, async () => {
  try {
    await mongoose.connect(config.DBUrl);
    console.log(`Server listening on port ${config.port}`);
  } catch (err) {
    console.log(err);
  }
});
