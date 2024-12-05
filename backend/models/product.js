const mongoose = require("mongoose");

// MongoDB Schema (Mongoose) - Product Schema (Model)
const productSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String, required: [true, "Description is required"] },
    richDescription: { type: String, default: "" }, // For HTML or formatted content
    images: {
      type: [String], // Array of image URLs
      validate: {
        validator: (v) => v.length > 0,
        message: "At least one image must be provided",
      },
    },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" ,required: [true, "Brand is required"] },
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
      default: null, // Set default to null instead of 0
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating cannot exceed 5"],
    },
    isFeatured: { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// MongoDB Model (Collection) - Product Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
