const express = require("express");
const {
	loginAdmin,
	bootstrapAdmin,
	getAdminStatus,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/bootstrap", bootstrapAdmin);
router.get("/status", getAdminStatus);

module.exports = router;
