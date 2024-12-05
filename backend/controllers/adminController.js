const cloudinary = require("../config/cloudinary");
const Admin = require("../models/admin");
const stream = require("stream");

// Helper function to handle Cloudinary uploads
const uploadToCloudinary = (fileBuffer, folder = "admins") => {
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
const validateAdminData = (name, email) => {
  if (!name || !email) {
    return "All fields are required";
  }
  return null;
};

// Controller for creating a admin
const createAdmin = async (req, res) => {
  try {
    const { name, email } = req.body;
    const validationError = validateAdminData(name, email);
    if (validationError)
      return res.status(400).json({ success: false, message: validationError });

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    const newAdmin = new Admin({
      name,
      image: result.secure_url,
      email,
    
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    console.error("Error creating admin:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller for getting all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller for updating a admin by ID
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const validationError = validateAdminData(name, email);
    if (validationError)
      return res.status(400).json({ success: false, message: validationError });

    const admin = await Admin.findById(id);
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });

    if (req.file) {
      if (admin.image) await deleteFromCloudinary(admin.image);

      const result = await uploadToCloudinary(req.file.buffer);
      admin.image = result.secure_url;
    }

    admin.name = name;
    admin.email = email;

    const updatedAdmin = await admin.save();
    res.status(200).json(updatedAdmin);
  } catch (err) {
    console.error("Error updating admin:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller for deleting a admin by ID
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });

    await deleteFromCloudinary(admin.image);
    await Admin.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Admin deleted successfully" });
  } catch (err) {
    console.error("Error deleting Admin:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting admin",
        error: err.message,
      });
  }
};

module.exports = {
    createAdmin,
    getAllAdmins,
    updateAdmin,
    deleteAdmin,
};
