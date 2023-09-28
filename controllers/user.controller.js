const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

const User = require("../models/user.model");
const Article = require("../models/article.model");
const Course = require("../models/course.model");
const Event = require("../models/event.model");

const generateToken = (id) => {
  const token = jwt.sign(
    {
      _id: id,
    },
    config.jwtSecret,
    {
      expiresIn: "30d",
    }
  );
  return token;
};

module.exports.addUser = function addUser(user) {
  const newUser = new User(user);
  newUser.save(function (err) {
    if (err) console.log(err);
  });
};

module.exports.register = async function register(req, res) {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new User({
      username: req.body.username,
      email: req.body.email,
      avatarUrl: req.body.avatarUrl || "",
      passwordHash: passwordHash,
    });

    const user = await doc.save();

    const token = generateToken(user._id);

    res.json({ accessToken: token });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "This email is already used" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
    console.log(err);
  }
};

module.exports.signIn = async function signIn(req, res) {
  try {
    const password = req.body.password;

    User.findOne({
      email: req.body.email,
    })
      .then((user) => {
        if (bcrypt.compareSync(password, user.passwordHash)) {
          const token = generateToken(user._id);
          res.json({ accessToken: token });
        } else throw "error";
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Wrong email or password" });
      });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json("Server error");
  }
};

module.exports.getUser = async function getUser(req, res) {
  const userId = req.params.id;
  let user = await User.findById(userId);
  if (userId == req.userId) {
    user = { ...user._doc, isUser: true };
  } else {
    user = { ...user._doc, isUser: false };
  }
  const subs = await User.where("subscriptions").in([userId]);
  const isSub = subs.reduce((acc, cur) => {
    return cur._id.valueOf() == req.userId || acc;
  }, false);
  user = { ...user, subsCount: subs.length, isSub: isSub };
  const articles = await Article.find({ user: userId });
  const courses = await Course.find({ author: userId });
  const events = await Event.find({ user: userId });
  res.json({ user, articles, courses, events });
};

module.exports.getUsers = async function getUsers(req, res) {
  const users = await User.find();
  res.json(users);
};

module.exports.getId = async function (req, res) {
  res.json(req.userId);
};

module.exports.followUser = async function (req, res) {
  try {
    await User.findById(req.userId)
      .where("subscriptions")
      .nin([req.body.userId])
      .updateOne({ $push: { subscriptions: req.body.userId } });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
};

module.exports.unfollow = async function (req, res) {
  try {
    await User.findById(req.userId).updateOne({
      $pull: { subscriptions: req.body.userId },
    });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
};

module.exports.getSubscriptions = async function (req, res) {
  try {
    const user = await User.findById(req.userId);
    const articles = await Promise.all(
      user.subscriptions.map(async (subId) => {
        let subArticles = await Article.find({ user: subId });
        const user = await User.findById(subId);
        subArticles = subArticles.map((article) => {
          return {
            ...article._doc,
            userName: user.username,
          };
        });
        return subArticles;
      })
    );
    res.json({ articles: articles.flat() });
  } catch (e) {
    console.log(e);
  }
};
