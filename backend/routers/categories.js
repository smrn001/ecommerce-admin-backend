const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// Fetch all categories
router.get(`/`, async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories from MongoDB
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Fetch a single category by ID
router.get(`/:id`, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id); // Fetch category by ID
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add a new category
router.post(`/`, async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
      image: req.body.image,
      colour: req.body.colour,
      icon: req.body.icon,
    });

    const savedCategory = await newCategory.save(); // Save new category to MongoDB
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update an existing category
router.put(`/:id`, async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        image: req.body.image,
        colour: req.body.colour,
        icon: req.body.icon,
      },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete a category
router.delete(`/:id`, async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id); // Delete category by ID
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Category has been deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
