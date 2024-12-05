const cloudinary = require("../config/cloudinary");
const Brand = require("../models/brand");
const stream = require("stream");

// Helper function to handle Cloudinary uploads
const uploadToCloudinary = (fileBuffer, folder = "brands") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);
    bufferStream.pipe(uploadStream);
  });
};

// Helper function to delete image from Cloudinary
const deleteFromCloudinary = async (imageUrl) => {
  const imagePublicId = imageUrl.split("/").pop().split(".")[0];
  return cloudinary.uploader.destroy(imagePublicId);
};

// Validation helper function
const validateBrandData = (name, description) => {
  if (!name || !description) {
    return "All fields are required";
  }
  return null;
};

// Controller for creating a Brand
const createBrand = async (req, res) => {
  try {
    const { name, description } = req.body;
    const validationError = validateBrandData(name, description);
    if (validationError)
      return res.status(400).json({ success: false, message: validationError });

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    const newBrand = new Brand({
      name,
      description,
      image: result.secure_url,
    });

    const savedBrand = await newBrand.save();
    res.status(201).json(savedBrand);
  } catch (err) {
    console.error("Error creating Brand:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller for getting a brand by ID
const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Brand by its ID
    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "brand not found",
      });
    }

    // Return the found Brand
    res.status(200).json(brand);
  } catch (err) {
    console.error("Error fetching brand by ID:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching brand by ID",
      error: err.message,
    });
  }
};

// Controller for getting all     Brand

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (err) {
    console.error("Error fetching brands:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller for updating a Brand by ID
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name  , description} = req.body;
    const validationError = validateBrandData(name);
    if (validationError)
      return res.status(400).json({ success: false, message: validationError });

    const brand = await Brand.findById(id);
    if (!brand)
      return res
        .status(404)
        .json({ success: false, message: "brand not found" });

    if (req.file) {
      if (brand.image) await deleteFromCloudinary(brand.image);

      const result = await uploadToCloudinary(req.file.buffer);
      brand.image = result.secure_url;
    }

    brand.name = name;
    brand.description = description;

    const updateBrand = await brand.save();
    res.status(200).json(updateBrand);
  } catch (err) {
    console.error("Error updating Brand:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller for deleting a Brand by ID
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand)
      return res
        .status(404)
        .json({ success: false, message: "brand not found" });

    await deleteFromCloudinary(brand.image);
    await Brand.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Brand deleted successfully" });
  } catch (err) {
    console.error("Error deleting Brand:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting Brand",
      error: err.message,
    });
  }
};

module.exports = {
    createBrand,
    getBrandById,
    getAllBrands,
    updateBrand,
    deleteBrand,
};
