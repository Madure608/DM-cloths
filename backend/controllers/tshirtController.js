import TShirt from "../models/TShirt.js";

const listTShirts = async (req, res) => {
  const items = await TShirt.find().sort({ createdAt: -1 });
  return res.json(items);
};

const createTShirt = async (req, res) => {
  const { color, sizesAvailable, price, imageUrl } = req.body;

  if (!color || !Array.isArray(sizesAvailable) || !price || !imageUrl) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const created = await TShirt.create({
    color,
    sizesAvailable,
    price,
    imageUrl
  });

  return res.status(201).json(created);
};

const updateTShirt = async (req, res) => {
  const { id } = req.params;
  const { color, sizesAvailable, price, imageUrl } = req.body;

  const updated = await TShirt.findByIdAndUpdate(
    id,
    { color, sizesAvailable, price, imageUrl },
    { new: true, runValidators: true }
  );

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

export { listTShirts, createTShirt, updateTShirt, deleteTShirt };
