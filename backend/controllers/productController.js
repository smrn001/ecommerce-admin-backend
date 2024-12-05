const cloudinary = require("../config/cloudinary");
const Product = require("../models/product");
const stream = require("stream");

// Helper function to handle Cloudinary uploads
const uploadToCloudinary = (fileBuffer, folder = "products") => {
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
const validateProductData = (
  name,
  description,
  image,
  brand,
  price,
  category
) => {
  if (!name || !description || !image || !brand || !price || !category) {
    return "All fields are required";
  }
  return null;
};

// Controller for creating a product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      richDescription,
      brand,
      price,
      category,
      countInStock,
      rating,
      isFeatured,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required" });
    }

    // Upload all images to Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );

    const newProduct = new Product({
      name,
      description,
      images: uploadedImages.map((img) => img.secure_url), // All images
      richDescription,
      brand,
      price,
      category,
      countInStock,
      rating,
      isFeatured,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};



// Controller for getting a product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product by its ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    // Return the found product
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching product by ID",
      error: err.message,
    });
  }
};

// Controller for getting all     product

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller for updating a product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      richDescription,
      brand,
      price,
      category,
      countInStock,
      rating,
      isFeatured,
    } = req.body;

    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // Handle images if provided
    if (req.files && req.files.length > 0) {
      // Delete all old images from Cloudinary
      if (product.images && product.images.length > 0) {
        await Promise.all(product.images.map(deleteFromCloudinary));
      }

      // Upload new images to Cloudinary
      const uploadedImages = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );
      product.images = uploadedImages.map((img) => img.secure_url);
    }

    // Update other fields
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.richDescription = richDescription ?? product.richDescription;
    product.brand = brand ?? product.brand;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.countInStock = countInStock ?? product.countInStock;
    product.rating = rating ?? product.rating;
    product.isFeatured = isFeatured ?? product.isFeatured;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller for deleting a Product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Delete all associated images from Cloudinary
    if (product.images && product.images.length > 0) {
      await Promise.all(product.images.map(deleteFromCloudinary));
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ success: false, message: "Error deleting product", error: err.message });
  }
};

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
