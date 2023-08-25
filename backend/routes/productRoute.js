const {
  getAllProducts,
  getProductById,
} = require("../controller/productController");
const express = require("express");
const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/:id").get(getProductById);

module.exports = router;
