const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");

// Create a new banner
router.post("/", upload.single("image"), createBanner);

// Get all banners
router.get("/", getAllBanners);

// Update an existing banner by ID
router.put("/:id", upload.single("image"), updateBanner);

// Delete a banner by its ID
router.delete("/:id", deleteBanner);

module.exports = router;
