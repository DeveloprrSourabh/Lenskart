const { compare } = require("bcryptjs");
const { hashPassword, unHashPassword } = require("../helpers/userHelper");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register User
exports.userRegisterController = async (req, res) => {
  try {
    const { name, email, password, answer, address } = req.body;
    if (!name) {
      res.send({ error: "Name is Required" });
    }
    if (!email) {
      res.send({ error: "Email is Required" });
    }
    if (!password) {
      res.send({ error: "Password is Required" });
    }
    if (!answer) {
      res.send({ error: "Answer is Required" });
    }
    if (!address) {
      res.send({ error: "Address is Required" });
    }
    // check user exists or not
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(200).send({
        success: false,
        message: "User Already Register Please Login",
      });
    }

    // Hash Password
    const secPass = await hashPassword(password);

    // Register new user
    const user = await new User({
      name,
      email,
      answer,
      address,
      password: secPass,
    }).save();
    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while register user",
    });
  }
};

// Login User
exports.userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.send({ error: "Email is Required" });
    }
    if (!password) {
      res.send({ error: "Password is Required" });
    }
    // Check User
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send({
        success: false,
        message: "Invalid Email",
      });
    }

    // Check Password
    const comparePass = await unHashPassword(password, user.password);

    if (!comparePass) {
      res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //Authentication Token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while register user",
    });
  }
};
