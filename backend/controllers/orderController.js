const cloudinary = require("../config/cloudinary");
const OrderIntent = require("../models/OrderIntent");
const TShirt = require("../models/TShirt");
const twilio = require("twilio");

const uploadStickerToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "dm-cloths/stickers",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );

    uploadStream.end(buffer);
  });

const normalizePhone = (phone) => {
  if (!phone) return "";
  const trimmed = phone.replace(/\s+/g, "");
  if (trimmed.startsWith("+")) return trimmed;
  if (trimmed.startsWith("0") && trimmed.length === 10) {
    return `+94${trimmed.slice(1)}`;
  }
  return trimmed;
};

const sendWhatsAppNotification = async (message) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.ADMIN_WHATSAPP_TO;

  if (!accountSid || !authToken || !from || !to) {
    return;
  }

  const client = twilio(accountSid, authToken);
  await client.messages.create({
    from: `whatsapp:${from}`,
    to: `whatsapp:${normalizePhone(to)}`,
    body: message,
  });
};

const createOrderIntent = async (req, res) => {
  const {
    customerName,
    phoneNumber,
    selectedTShirtId,
    selectedColor,
    selectedSize,
  } = req.body;

  if (!selectedTShirtId || !selectedColor || !selectedSize) {
    return res.status(400).json({ message: "Missing order data" });
  }

  const tshirt = await TShirt.findById(selectedTShirtId);
  if (!tshirt) {
    return res.status(404).json({ message: "T-shirt not found" });
  }

  let uploadedStickerUrl = "";
  if (req.file) {
    const uploadResult = await uploadStickerToCloudinary(req.file.buffer);
    uploadedStickerUrl = uploadResult.secure_url;
  }

  const orderIntent = await OrderIntent.create({
    customerName: customerName || "",
    phoneNumber: phoneNumber || "",
    userId: req.user?._id || null,
    selectedTShirtId,
    selectedColor,
    selectedSize,
    uploadedStickerUrl,
    status: "pending",
  });

  return res.status(201).json({
    orderIntent,
    uploadedStickerUrl,
  });
};

const confirmOrder = async (req, res) => {
  const { orderIntentId } = req.body;

  if (!orderIntentId) {
    return res.status(400).json({ message: "Order intent ID is required" });
  }

  const intent = await OrderIntent.findById(orderIntentId).populate(
    "selectedTShirtId"
  );

  if (!intent) {
    return res.status(404).json({ message: "Order intent not found" });
  }

  const message =
    "New order confirmed\n" +
    `Color: ${intent.selectedColor}\n` +
    `Size: ${intent.selectedSize}\n` +
    `Price: Rs. ${intent.selectedTShirtId?.price || "-"}\n` +
    `Customer: ${intent.customerName || "-"}\n` +
    `Phone: ${normalizePhone(intent.phoneNumber) || "-"}\n` +
    `Sticker: ${intent.uploadedStickerUrl || "Not provided"}`;

  try {
    await sendWhatsAppNotification(message);
  } catch (err) {
    console.error("Failed to send WhatsApp notification", err.message);
  }

  const io = req.app.get("io");
  if (io) {
    io.emit("order:confirmed", {
      id: intent._id,
      selectedColor: intent.selectedColor,
      selectedSize: intent.selectedSize,
      customerName: intent.customerName || "",
      phoneNumber: intent.phoneNumber || "",
      createdAt: intent.createdAt,
    });
  }

  return res.json({ ok: true });
};

const listOrderIntents = async (req, res) => {
  const intents = await OrderIntent.find()
    .populate("selectedTShirtId")
    .sort({ createdAt: -1 });
  return res.json(intents);
};

const listUserOrderIntents = async (req, res) => {
  const intents = await OrderIntent.find({ userId: req.user._id })
    .populate("selectedTShirtId")
    .sort({ createdAt: -1 });
  return res.json(intents);
};

module.exports = {
  createOrderIntent,
  confirmOrder,
  listOrderIntents,
  listUserOrderIntents,
};
