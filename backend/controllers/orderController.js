const cloudinary = require("../config/cloudinary");
const OrderIntent = require("../models/OrderIntent");
const TShirt = require("../models/TShirt");

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

const createOrderIntent = async (req, res) => {
  const {
    customerName,
    phoneNumber,
    selectedTShirtId,
    selectedColor,
    selectedSize,
  } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Sticker image is required" });
  }

  if (!selectedTShirtId || !selectedColor || !selectedSize) {
    return res.status(400).json({ message: "Missing order data" });
  }

  const tshirt = await TShirt.findById(selectedTShirtId);
  if (!tshirt) {
    return res.status(404).json({ message: "T-shirt not found" });
  }

  const uploadResult = await uploadStickerToCloudinary(req.file.buffer);

  const orderIntent = await OrderIntent.create({
    customerName: customerName || "",
    phoneNumber: phoneNumber || "",
    selectedTShirtId,
    selectedColor,
    selectedSize,
    uploadedStickerUrl: uploadResult.secure_url,
    status: "pending",
  });

  return res.status(201).json({
    orderIntent,
    uploadedStickerUrl: uploadResult.secure_url,
  });
};

const listOrderIntents = async (req, res) => {
  const intents = await OrderIntent.find()
    .populate("selectedTShirtId")
    .sort({ createdAt: -1 });
  return res.json(intents);
};

module.exports = { createOrderIntent, listOrderIntents };
