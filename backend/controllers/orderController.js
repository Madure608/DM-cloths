import OrderIntent from "../models/OrderIntent.js";
import { cloudinary } from "../config/cloudinary.js";

const createOrderIntent = async (req, res) => {
  const { customerName, phoneNumber, selectedTShirtId, selectedColor, selectedSize } =
    req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Sticker image is required" });
  }

  if (!selectedTShirtId || !selectedColor || !selectedSize) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const uploadResult = await cloudinary.uploader.upload(req.file.path, {
    folder: "dm-cloths/stickers",
    resource_type: "image"
  });

  const intent = await OrderIntent.create({
    customerName,
    phoneNumber,
    selectedTShirtId,
    selectedColor,
    selectedSize,
    uploadedStickerUrl: uploadResult.secure_url,
    status: "pending"
  });

  return res.status(201).json({
    id: intent._id,
    uploadedStickerUrl: uploadResult.secure_url
  });
};

const listOrderIntents = async (req, res) => {
  const intents = await OrderIntent.find()
    .populate("selectedTShirtId")
    .sort({ createdAt: -1 });
  return res.json(intents);
};

export { createOrderIntent, listOrderIntents };
