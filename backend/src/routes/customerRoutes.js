import express from "express";
import { getCustomers } from "../controllers/customerController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getCustomers);

export default router;
