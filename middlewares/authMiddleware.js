const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");
// Check User Login
exports.requireSignIn = async (req, res, next) => {
  try {
    const decode = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    // console.log(error);
    return res.status(401).send({
      success: false,
      message: "Jwt Must Be Provided",
      error,
    });
  }
};

// Check Admin
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
