const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

const User = require("../models/user.model");

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
      avatarUrl: req.body.avatarUrl,
      passwordHash: passwordHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.jwtSecret,
      {
        expiresIn: "30d",
      }
    );
    res.json(token);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getUser = async function getUser(req, res) {
  const user = await User.findById(req.body.userId);
  res.json(user);
};

module.exports.getUsers = async function getUsers(req, res) {
  const users = await User.find();
  res.json(users);
};
