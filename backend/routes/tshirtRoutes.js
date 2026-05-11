const express = require("express");
const {
  getTShirts,
  createTShirt,
  updateTShirt,
  deleteTShirt,
} = require("../controllers/tshirtController");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getTShirts);
router.post("/", protect, upload.single("image"), createTShirt);
router.put("/:id", protect, upload.single("image"), updateTShirt);
router.delete("/:id", protect, deleteTShirt);

module.exports = router;
