const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
    createAdmin,
    getAllAdmins,
    updateAdmin,
    deleteAdmin,
} = require("../controllers/adminController");

// Create a new admin
router.post("/", upload.single("image"), createAdmin);

// Get all admins
router.get("/", getAllAdmins);

// Update an existing admin by ID
router.put("/:id", upload.single("image"), updateAdmin);

// Delete a admin  by its ID
router.delete("/:id", deleteAdmin);

module.exports = router;
