const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
} = require("../controller/productController");
const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getAllProducts).post(protect, admin, createProduct);

router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

module.exports = router;
