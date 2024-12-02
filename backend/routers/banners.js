const express = require("express");
const router = express.Router();
const Banner = require("../models/banner");

// Create a new banner
router.post("/", async (req, res) => {
  try {
    const { name, image, link, isActive } = req.body;
    const newBanner = new Banner({ name, image, link, isActive });

    const savedBanner = await newBanner.save();
    res.status(201).json(savedBanner);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all banners
router.get("/", async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update a banner
router.put("/:id", async (req, res) => {
  try {
    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedBanner);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete a banner
router.delete("/:id", async (req, res) => {
  try {
    const deletedBanner = await Banner.findByIdAndDelete(req.params.id);
    if (deletedBanner) {
      res.status(200).json({ success: true, message: "Banner deleted" });
    } else {
      res.status(404).json({ success: false, message: "Banner not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
