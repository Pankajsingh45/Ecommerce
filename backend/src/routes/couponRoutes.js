import express from "express";
import {
  addCoupon,
  getCoupons,
  applyCoupon,
  getAvailableCoupons,
} from "../controllers/couponController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/available", getAvailableCoupons); // public — sabhi logged-in users dekh sakte hain
router.post("/", protect, adminOnly, addCoupon);
router.get("/", protect, adminOnly, getCoupons);
router.post("/apply", applyCoupon);

export default router;
