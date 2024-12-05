const multer = require("multer");

// Multer setup for file handling with file size limit and image file type validation
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

// Export middleware for file upload
module.exports = upload;
