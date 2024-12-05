const cloudinary = require("../config/cloudinary");
const Category = require("../models/category");
const stream = require("stream");

// Helper function to handle Cloudinary uploads
const uploadToCloudinary = (fileBuffer, folder = "categories") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);
    bufferStream.pipe(uploadStream);
  });
};

// Helper function to delete image from Cloudinary
const deleteFromCloudinary = async (imageUrl) => {
  const imagePublicId = imageUrl.split("/").pop().split(".")[0];
  return cloudinary.uploader.destroy(imagePublicId);
};

// Validation helper function
const validateCategoryData = (name, ) => {
  if (!name ) {
    return "All fields are required";
  }
  return null;
};

// Controller for creating a category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const validationError = validateCategoryData(name);
    if (validationError)
      return res.status(400).json({ success: false, message: validationError });

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    const newCategory = new Category({
      name,
      image: result.secure_url,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller for getting a category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the category by its ID
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Return the found category
    res.status(200).json(category);
  } catch (err) {
    console.error("Error fetching category by ID:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching category",
      error: err.message,
    });
  }
};

// Controller for getting all     const newCategory = new Category({

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller for updating a category by ID
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const validationError = validateCategoryData(name);
    if (validationError)
      return res.status(400).json({ success: false, message: validationError });

    const category = await Category.findById(id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "category not found" });

    if (req.file) {
      if (category.image) await deleteFromCloudinary(category.image);

      const result = await uploadToCloudinary(req.file.buffer);
      category.image = result.secure_url;
    }

    category.name = name;

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller for deleting a category by ID
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "category not found" });

    await deleteFromCloudinary(category.image);
    await Category.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting category",
      error: err.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
