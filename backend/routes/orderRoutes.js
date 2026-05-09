import { Router } from "express";
import multer from "multer";
import requireAdminAuth from "../middleware/auth.js";
import {
  createOrderIntent,
  listOrderIntents
} from "../controllers/orderController.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/intent", upload.single("sticker"), createOrderIntent);
router.get("/intent", requireAdminAuth, listOrderIntents);

export default router;
