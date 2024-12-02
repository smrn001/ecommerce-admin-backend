const express = require("express");
const router = express.Router();
const Collection = require("../models/collection");
const Product = require("../models/product");

// Create a new collection
router.post("/", async (req, res) => {
  try {
    const { name, image, description, isActive, products } = req.body;

    const newCollection = new Collection({
      name,
      image,
      description,
      isActive,
      products, // List of product IDs
    });

    const savedCollection = await newCollection.save();
    res.status(201).json(savedCollection);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all collections with populated product details
router.get("/", async (req, res) => {
  try {
    const collections = await Collection.find().populate("products");
    res.status(200).json(collections);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get a single collection by ID with populated products
router.get("/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id).populate(
      "products"
    );
    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }
    res.status(200).json(collection);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update a collection by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCollection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }
    res.status(200).json(updatedCollection);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete a collection by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedCollection = await Collection.findByIdAndDelete(req.params.id);
    if (!deletedCollection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Collection deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add a product to a collection
router.put("/:id/products", async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Add the product to the collection
    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      { $push: { products: productId } },
      { new: true }
    );

    if (!updatedCollection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }

    res.status(200).json(updatedCollection);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Remove a product from a collection
router.delete("/:id/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    // Remove the product from the collection
    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      { $pull: { products: productId } },
      { new: true }
    );

    if (!updatedCollection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }

    res.status(200).json(updatedCollection);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
