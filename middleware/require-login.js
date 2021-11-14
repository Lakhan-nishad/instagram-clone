const mongoose = require("mongoose");
const User = mongoose.model("User");
const { JWT_SECRET } = require("../keys");

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "you must be loged in1" });
  }
  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be loged in2" });
    }

    User.findById(payload._id).then((userData) => {
      req.user = userData;
      next();
    });
    
  });
};
