const express = require("express");
const {
  userRegisterController,
  userLoginController,
  userForgotPasswordController,
  userUpdateController,
} = require("../controllers/userController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// REGISTER USER || METHOD POST
router.post("/register", userRegisterController);

// LOGIN USER || METHOD POST
router.post("/login", userLoginController);

// FORGOT PASSWORD || METHOD POST
router.post("/forgot-password", userForgotPasswordController);

// Update PROFILE || METHOD PUT
router.put("/update-user", requireSignIn, userUpdateController);

// ADMIN AUTH || METHOD GET
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  return res.status(200).send({ ok: true });
});

// USER AUTH || METHOD GET
router.get("/user-auth", requireSignIn, (req, res) => {
  return res.status(200).send({ ok: true });
});

module.exports = router;
