const bcrypt = require("bcryptjs");

// Hash Password
exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Hash Password",
    });
  }
};

// Unhash Password
exports.unHashPassword = async (password, userPassword) => {
  try {
    const unhashPass = await bcrypt.compare(password, userPassword);
    return unhashPass;
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Unhash Password",
    });
  }
};
