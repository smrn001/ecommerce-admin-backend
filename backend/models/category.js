const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  image: { type: String, required: [true, "Image URL is required"] },
  colour: { type: String, required: [true, "Colour is required"] },
  icon: { type: String, required: [true, "Icon is required"] },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

// MongoDB Schema (Mongoose) - Product Schema (Model)
