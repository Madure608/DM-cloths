const TShirt = require("../models/TShirt");

const getTShirts = async (req, res) => {
  const tshirts = await TShirt.find().sort({ createdAt: -1 });
  return res.json(tshirts);
};

const createTShirt = async (req, res) => {
  const { color, sizesAvailable, price, imageUrl } = req.body;

  if (!color || !Array.isArray(sizesAvailable) || typeof price !== "number") {
    return res.status(400).json({ message: "Invalid T-shirt data" });
  }

  const tshirt = await TShirt.create({
    color,
    sizesAvailable,
    price,
    imageUrl: imageUrl || "",
  });

  return res.status(201).json(tshirt);
};

const updateTShirt = async (req, res) => {
  const { id } = req.params;
  const updated = await TShirt.findByIdAndUpdate(id, req.body, { new: true });

  if (!updated) {
    return res.status(404).json({ message: "T-shirt not found" });
  }

  return res.json(updated);
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
