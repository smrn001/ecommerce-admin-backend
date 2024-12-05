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
    required: [true, "Brand description is required"],

  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;