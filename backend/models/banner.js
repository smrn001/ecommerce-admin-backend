const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Banner name is required"],
  },
  image: {
    type: String,
    required: [true, "Banner image is required"],
  },
  link: {
    type: String,
    default: "", // Optional field for link
  },
  isActive: {
    type: Boolean,
    default: true, // Indicates if the banner is active or not
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;