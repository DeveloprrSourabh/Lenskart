const express = require("express");
const formidable = require("express-formidable");
const {
  createProductController,
  updateProductController,
  deleteProductController,
  getAllProductController,
  getSingleProductController,
} = require("../controllers/productController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// ALL ROUTES

// CREATE PRODUCT || METHOD POST
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// UPDATE PRODUCT || METHOD PUT
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  updateProductController
);

// DELETE PRODUCT || METHOD DELETE
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

// GET ALL PRODUCT || METHOD GET
router.get("/get-products/", getAllProductController);

// GET SINGLE PRODUCT || METHOD GET
router.get("/get-product/:slug", getSingleProductController);

module.exports = router;
