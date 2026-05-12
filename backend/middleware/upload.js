const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadRoot = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadRoot)) {
      fs.mkdirSync(uploadRoot, { recursive: true });
    }
    cb(null, uploadRoot);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    const safeStamp = Date.now();
    const safeRand = Math.round(Math.random() * 1e9);
    cb(null, `tshirt-${safeStamp}-${safeRand}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image uploads are allowed"));
  }
  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
