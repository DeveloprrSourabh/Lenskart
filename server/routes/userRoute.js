const express = require("express");
const {
  userRegisterController,
  userLoginController,
} = require("../controllers/userController");
const router = express.Router();

// REGISTER USER || METHOD POST
router.post("/register", userRegisterController);

// LOGIN USER || METHOD POST
router.post("/login", userLoginController);

module.exports = router;
