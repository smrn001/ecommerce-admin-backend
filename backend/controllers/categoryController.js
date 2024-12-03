const Category = require("../models/category");

// Fetch all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Fetch a single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add a new category
const createCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
      image: req.body.image,
      colour: req.body.colour,
      icon: req.body.icon,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update an existing category
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        image: req.body.image,
        colour: req.body.colour,
        icon: req.body.icon,
      },
      { new: true }
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
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
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
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
