const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
const { User } = require("../models/user.models");
const authCheck = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("No token found");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Error auth", error });
  }
};

module.exports = { authCheck };
