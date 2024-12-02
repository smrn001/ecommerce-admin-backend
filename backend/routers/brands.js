const express = require("express");
const router = express.Router();
const Brand = require("../models/brand");

// Create a new brand
router.post("/", async (req, res) => {
  try {
    const { name, image, description, isActive } = req.body;
    const newBrand = new Brand({ name, image, description, isActive });

    const savedBrand = await newBrand.save();
    res.status(201).json(savedBrand);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all brands
router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get a single brand by ID
router.get("/:id", async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }
    res.status(200).json(brand);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update a brand by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBrand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }
    res.status(200).json(updatedBrand);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete a brand by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
    if (!deletedBrand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Brand deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
