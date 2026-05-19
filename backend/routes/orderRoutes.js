const express = require("express");
const {
  createOrderIntent,
  confirmOrder,
  listOrderIntents,
} = require("../controllers/orderController");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/intent", upload.single("sticker"), createOrderIntent);
router.post("/confirm", confirmOrder);
router.get("/intents", protect, listOrderIntents);

module.exports = router;
