const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Fetch all products
router.get(`/`, async (req, res) => {
  try {
    const products = await Product.find().populate("category"); // Populate category details
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Fetch a single product by ID
router.get(`/:id`, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category"); // Populate category details
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add a new product
router.post(`/`, async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
    });

    const savedProduct = await newProduct.save(); // Save to MongoDB
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update a product
router.put(`/:id`, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
      },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete a product
router.delete(`/:id`, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id); // Delete from MongoDB
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "The product has been deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
