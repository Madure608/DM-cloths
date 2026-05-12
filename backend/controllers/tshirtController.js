const TShirt = require("../models/TShirt");

const buildImageUrl = (req, file) => {
  if (!file) return "";
  const host = req.get("host");
  const protocol = req.protocol;
  return `${protocol}://${host}/uploads/${file.filename}`;
};

const parseSizesAvailable = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  return [];
};

const getTShirts = async (req, res) => {
  const tshirts = await TShirt.find().sort({ createdAt: -1 });
  return res.json(tshirts);
};

const createTShirt = async (req, res) => {
  try {
    const { color, price } = req.body;
    const sizesAvailable = parseSizesAvailable(req.body.sizesAvailable);

    const parsedPrice = Number.parseFloat(price);

    if (!color || !Array.isArray(sizesAvailable) || sizesAvailable.length === 0) {
      return res.status(400).json({ message: "Invalid T-shirt data" });
    }

    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({ message: "Invalid price" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image upload is required" });
    }

    const tshirt = await TShirt.create({
      color,
      sizesAvailable,
      price: parsedPrice,
      imageUrl: buildImageUrl(req, req.file),
    });

    return res.status(201).json(tshirt);
  } catch (err) {
    return res.status(400).json({ message: err.message || "Create failed" });
  }
};

const updateTShirt = async (req, res) => {
  try {
    const { id } = req.params;
    const sizesAvailable = parseSizesAvailable(req.body.sizesAvailable);
    const payload = { ...req.body };

    if (payload.price !== undefined) {
      const parsedPrice = Number.parseFloat(payload.price);
      if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
        return res.status(400).json({ message: "Invalid price" });
      }
      payload.price = parsedPrice;
    }

    if (sizesAvailable.length > 0) {
      payload.sizesAvailable = sizesAvailable;
    }

    if (req.file) {
      payload.imageUrl = buildImageUrl(req, req.file);
    }

    const updated = await TShirt.findByIdAndUpdate(id, payload, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "T-shirt not found" });
    }

    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ message: err.message || "Update failed" });
  }
};

const deleteTShirt = async (req, res) => {
  const { id } = req.params;
  const deleted = await TShirt.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ message: "T-shirt not found" });
  }

  return res.json({ message: "T-shirt deleted" });
};

module.exports = {
  getTShirts,
  createTShirt,
  updateTShirt,
  deleteTShirt,
};
