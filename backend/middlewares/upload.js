const multer = require("multer");

// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Export middleware for file upload
module.exports = upload;