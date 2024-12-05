const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Middleware to validate product data
const validateProductData = (req, res, next) => {
  const { name, description, brand, price, category } = req.body;
  if (!name || !description || !brand || !price || !category) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  next();
};

// Create a new product
router.post("/", upload.array("images", 5), validateProductData, createProduct); // Limit to 5 images

// Get all products
router.get("/", getAllProducts);

// Get a product by its ID
router.get("/:id", getProductById);

// Update an existing product by ID
router.put(
  "/:id",
  upload.array("images", 5),
  validateProductData,
  updateProduct
); // Limit to 5 images

// Delete a product by its ID
router.delete("/:id", deleteProduct);

module.exports = router;
