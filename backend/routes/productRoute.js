const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} = require("../controller/productController");
const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const checkObjectId = require("../middleware/checkObjectId");

router.route("/").get(getAllProducts).post(protect, admin, createProduct);

router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);

module.exports = router;
