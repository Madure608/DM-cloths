const jwt = require("jsonwebtoken");
const AdminUser = require("../models/AdminUser");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await AdminUser.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Login failed" });
  }
};

const getAdminStatus = async (req, res) => {
  const existingAdmins = await AdminUser.countDocuments();
  return res.json({ hasAdmin: existingAdmins > 0 });
};

const bootstrapAdmin = async (req, res) => {
  try {
    const existingAdmins = await AdminUser.countDocuments();
    if (existingAdmins > 0) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const admin = await AdminUser.create({
      username,
      email: email.toLowerCase(),
      password,
    });
    return res.status(201).json({ id: admin._id, username: admin.username });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Admin already exists" });
    }
    return res.status(400).json({ message: err.message || "Signup failed" });
  }
};

module.exports = { loginAdmin, bootstrapAdmin, getAdminStatus };
