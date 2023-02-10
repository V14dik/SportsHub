const User = require("../models/user.model");

module.exports = function addUser(user) {
  const newUser = new User(user);
  newUser.save(function (err) {
    if (err) console.log(err);
  });
};
