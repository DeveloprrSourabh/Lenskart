const express = require("express");
const { userRegisterController } = require("../controllers/userController");
const router = express.Router();

// REGISTER USER || METHOD POST
router.post("/register", userRegisterController);

// REGISTER USER || METHOD POST
router.post("/register", userRegisterController);

module.exports = router;
