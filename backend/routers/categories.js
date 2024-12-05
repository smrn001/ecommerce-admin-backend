const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/",  getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", upload.single("image"), createCategory);
router.put("/:id",upload.single("image"), updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;

