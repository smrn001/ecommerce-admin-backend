const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Fetch all users
router.get(`/`, async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Fetch a single user by ID
router.get(`/:id`, async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Fetch user by ID
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add a new user (registration)
router.post(`/`, async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false, // Default to false if not provided
    });

    const savedUser = await newUser.save(); // Save new user to MongoDB
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update an existing user
router.put(`/:id`, async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Hash password if provided
    const updatedData = {
      name,
      email,
      isAdmin: isAdmin || false,
    };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true, // Return the updated document
      }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete a user
router.delete(`/:id`, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id); // Delete user by ID
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User has been deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login (Generate JWT token)
router.post(`/login`, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Find user by email

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // Check password

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
