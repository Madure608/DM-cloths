const express = require("express");
const {
  createOrderIntent,
  confirmOrder,
  listOrderIntents,
  listUserOrderIntents,
} = require("../controllers/orderController");
const { protect, protectUser, optionalUser } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.post(
  "/intent",
  optionalUser,
  upload.single("sticker"),
  createOrderIntent
);
router.post("/confirm", confirmOrder);
router.get("/intents", protect, listOrderIntents);
router.get("/my-intents", protectUser, listUserOrderIntents);

module.exports = router;
