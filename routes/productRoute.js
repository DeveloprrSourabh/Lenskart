const express = require("express");
const formidable = require("express-formidable");
const {
  createProductController,
  updateProductController,
  deleteProductController,
  getAllProductController,
  getSingleProductController,
  getProductPhotoController,
  productFilterController,
  productSearchController,
  braintreeTokenController,
  braintreePaymentController,
  userOrderController,
  OrderStatusController,
  topProductController,
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
  formidable(),
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

// PRODUCT PHOTO || METHOD GET
router.get("/product-photo/:slug", getProductPhotoController);

// PRODUCT FILTER || METHOD POST
router.post("/product-filters/", productFilterController);

// PRODUCT SEARCH || METHOD GET
router.get("/product-search/:keyword", productSearchController);

// BRAINTREE TOKEN || METHOD GET
router.get("/braintree/token", braintreeTokenController);

// BRAINTREE PAYMENT || METHOD POST
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

// USER ORDER || METHOD GET
router.get("/orders", requireSignIn, userOrderController);

//  ORDER STATUS UPDATE || METHOD POST
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  OrderStatusController
);

// TOP 6 PRODUCTS|| METHOD GET
router.get("/top-product", topProductController);

module.exports = router;
