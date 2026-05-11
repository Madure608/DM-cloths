const jwt = require("jsonwebtoken");
const AdminUser = require("../models/AdminUser");

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const admin = await AdminUser.findOne({ username: username.toLowerCase() });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({ token });
};

const bootstrapAdmin = async (req, res) => {
  const bootstrapKey = req.headers["x-bootstrap-key"] || req.body.bootstrapKey;
  if (!bootstrapKey || bootstrapKey !== process.env.ADMIN_BOOTSTRAP_KEY) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const existingAdmins = await AdminUser.countDocuments();
  if (existingAdmins > 0) {
    return res.status(409).json({ message: "Admin already exists" });
  }

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const admin = await AdminUser.create({ username, password });
  return res.status(201).json({ id: admin._id, username: admin.username });
};

module.exports = { loginAdmin, bootstrapAdmin };
