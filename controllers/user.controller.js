const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

const User = require("../models/user.model");

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
  const user = await User.findById(req.body.userId);
  res.json(user);
};

module.exports.getUsers = async function getUsers(req, res) {
  const users = await User.find();
  res.json(users);
};
