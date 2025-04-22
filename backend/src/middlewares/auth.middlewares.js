const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
const authCheck = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("No token found");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Error auth", error });
  }
};

module.exports = { authCheck };
