const cloudinary = require("../config/cloudinary");
const Banner = require("../models/banner");
const stream = require("stream");

// Helper function to handle Cloudinary uploads
const uploadToCloudinary = (fileBuffer, folder = "banners") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);
    bufferStream.pipe(uploadStream);
  });
};

// Helper function to delete image from Cloudinary
const deleteFromCloudinary = async (imageUrl) => {
  const imagePublicId = imageUrl.split('/').pop().split('.')[0];
  return cloudinary.uploader.destroy(imagePublicId);
};

// Validation helper function
const validateBannerData = (name, link, isActive) => {
  if (!name || !link || typeof isActive === "undefined") {
    return "All fields are required";
  }
  return null;
};

// Controller for creating a banner
const createBanner = async (req, res) => {
  try {
    const { name, link, isActive } = req.body;
    const validationError = validateBannerData(name, link, isActive);
    if (validationError) return res.status(400).json({ success: false, message: validationError });

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    const newBanner = new Banner({
      name,
      image: result.secure_url,
      link,
      isActive: isActive === "true",
    });

    const savedBanner = await newBanner.save();
    res.status(201).json(savedBanner);
  } catch (err) {
    console.error("Error creating banner:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller for getting all banners
const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (err) {
    console.error("Error fetching banners:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller for updating a banner by ID
const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, link, isActive } = req.body;
    const validationError = validateBannerData(name, link, isActive);
    if (validationError) return res.status(400).json({ success: false, message: validationError });

    const banner = await Banner.findById(id);
    if (!banner) return res.status(404).json({ success: false, message: "Banner not found" });

    if (req.file) {
      if (banner.image) await deleteFromCloudinary(banner.image);
      
      const result = await uploadToCloudinary(req.file.buffer);
      banner.image = result.secure_url;
    }

    banner.name = name;
    banner.link = link;
    banner.isActive = isActive === "true";

    const updatedBanner = await banner.save();
    res.status(200).json(updatedBanner);
  } catch (err) {
    console.error("Error updating banner:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller for deleting a banner by ID
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);
    if (!banner) return res.status(404).json({ success: false, message: "Banner not found" });

    await deleteFromCloudinary(banner.image);
    await Banner.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Error deleting banner:", err);
    res.status(500).json({ success: false, message: "Error deleting banner", error: err.message });
  }
};

module.exports = {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
};