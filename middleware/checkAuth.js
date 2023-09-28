const jwt = require("jsonwebtoken");

const config = require("../config.json");

module.exports = checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret);

      req.userId = decoded._id;

      next();
    } catch (err) {
      if (req.params.isUser) {
        next();
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  } else {
    if (req.params.isUser) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
};
