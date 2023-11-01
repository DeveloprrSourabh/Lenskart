const express = require("express");
const {
  userRegisterController,
  userLoginController,
  userForgotPasswordController,
} = require("../controllers/userController");
const router = express.Router();

// REGISTER USER || METHOD POST
router.post("/register", userRegisterController);

// LOGIN USER || METHOD POST
router.post("/login", userLoginController);

// FORGOT PASSWORD || METHOD POST
router.post("/forgot-password", userForgotPasswordController);

module.exports = router;
