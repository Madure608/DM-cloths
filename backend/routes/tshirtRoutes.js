const express = require("express");
const {
  getTShirts,
  createTShirt,
  updateTShirt,
  deleteTShirt,
} = require("../controllers/tshirtController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", getTShirts);
router.post("/", protect, createTShirt);
router.put("/:id", protect, updateTShirt);
router.delete("/:id", protect, deleteTShirt);

module.exports = router;
