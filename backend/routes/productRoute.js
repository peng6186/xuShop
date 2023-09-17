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

router.route("/").get(getAllProducts).post(protect, admin, createProduct);

router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

module.exports = router;
