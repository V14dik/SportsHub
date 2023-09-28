const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bp = require("body-parser");
const cors = require("cors");

const config = require("./config.json");
const UserController = require("./controllers/user.controller");
const ArticleController = require("./controllers/article.controller");
const EventController = require("./controllers/event.controller");
const CourseController = require("./controllers/course.controller");
const CommentController = require("./controllers/comment.controller");
const checkAuth = require("./middleware/checkAuth");

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Main page");
});

app.get("/sub", checkAuth, UserController.getSubscriptions);

app.post("/auth/registration", UserController.register);

app.post("/auth/user", UserController.signIn);

app.get("/get/user", checkAuth, UserController.getId);

app.post("/user/follow", checkAuth, UserController.followUser);

app.post("/user/unfollow", checkAuth, UserController.unfollow);

app.get("/user/:id/:isUser", checkAuth, UserController.getUser);

app.get("/users", UserController.getUsers);

app.delete("/article/:id", ArticleController.deleteArticle);

app.patch("/article/:id", ArticleController.updateArticle);

app.post("/article", checkAuth, ArticleController.addArticle);

app.get("/article/:articleId", ArticleController.getArticle);

app.get("/articles", ArticleController.getArticles);

app.delete("/article", ArticleController.deleteArticle);

app.post("/comment", checkAuth, ArticleController.addCommentToArticle);

app.post("/join", checkAuth, EventController.joinEvent);

app.post("/unjoin", checkAuth, EventController.unjoin);

app.post("/event", checkAuth, EventController.createEvent);

app.get("/event", EventController.getEvents);

app.get("/event/:eventId", EventController.getEvent);

app.get("/course/:courseId", CourseController.getCourse);

app.post("/course", checkAuth, CourseController.createCourse);

app.get("/courses", CourseController.getCourses);

mongoose.set("strictQuery", false);

app.listen(config.port, async () => {
  try {
    await mongoose.connect(config.DBUrl);
    console.log(`Server listening on port ${config.port}`);
  } catch (err) {
    console.log(err);
  }
});
