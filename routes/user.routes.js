const router = require("express").Router();
const User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").get((req, res) => {
  const newUser = new User(...req.body.user);
  newUser
    .save()
    .then(() => res.json("New user added"))
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
