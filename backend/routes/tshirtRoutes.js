import { Router } from "express";
import requireAdminAuth from "../middleware/auth.js";
import {
  createTShirt,
  deleteTShirt,
  listTShirts,
  updateTShirt
} from "../controllers/tshirtController.js";

const router = Router();

router.get("/", listTShirts);
router.post("/", requireAdminAuth, createTShirt);
router.put("/:id", requireAdminAuth, updateTShirt);
router.delete("/:id", requireAdminAuth, deleteTShirt);

export default router;
