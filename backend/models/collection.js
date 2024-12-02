const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Collection name is required"],
  },
  image: {
    type: String,
    required: [true, "Collection image is required"],
  },
  description: {
    type: String,
    default: "", // Optional description for the collection
  },
  isActive: {
    type: Boolean,
    default: true, // Indicates if the collection is active or not
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product model
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now, // Timestamp when the collection is created
  },
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;