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

module.exports = { loginAdmin };
