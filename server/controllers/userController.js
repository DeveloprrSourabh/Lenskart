const { hashPassword } = require("../helpers/userHelper");
const User = require("../models/userModel");

exports.userRegisterController = async (req, res) => {
  try {
    const { name, email, password, answer } = req.body;

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
