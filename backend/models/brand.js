const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Brand name is required"],
  },
  image: {
    type: String,
    required: [true, "Brand image is required"],
  },
  description: {
    type: String,
    default: "", // Optional field to describe the brand
  },
  isActive: {
    type: Boolean,
    default: true, // Indicates if the brand is active or inactive
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
