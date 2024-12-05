const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  createBrand,
  getBrandById,
  getAllBrands,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

router.get("/",  getAllBrands);
router.get("/:id", getBrandById);
router.post("/", upload.single("image"), createBrand);
router.put("/:id",upload.single("image"), updateBrand);
router.delete("/:id", deleteBrand);

module.exports = router;

