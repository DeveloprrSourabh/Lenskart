const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const router = express.Router();

//All Routes

// CREATE CATEGORY || METHOD POST
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// UPDATE CATEGORY || METHOD PUT
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
// DELETE CATEGORY || METHOD DELETE
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

module.exports = router;
