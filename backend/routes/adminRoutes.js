const express = require("express");
const { loginAdmin, bootstrapAdmin } = require("../controllers/adminController");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/bootstrap", bootstrapAdmin);

module.exports = router;
