const mongoose = require("mongoose");

// MongoDB Schema (Mongoose) - Product Schema (Model)
const productSchema = mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  description: { type: String, required: [true, "Description is required"] },
  richDescription: { type: String, default: "" }, // For HTML or formatted content
  image: { type: String, required: [true, "Image URL is required"] }, // Primary image
  images: { type: [String], default: [] }, // Additional images
  brand: { type: String, default: "" },
  price: { type: Number, default: 0, min: [0, "Price must be at least 0"] },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  countInStock: {
    type: Number,
    required: [true, "Count in stock is required"],
    min: [0, "Count in stock must be at least 0"],
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, "Rating must be at least 0"],
    max: [5, "Rating cannot exceed 5"],
  },
  isFeatured: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
});

// MongoDB Model (Collection) - Product Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
