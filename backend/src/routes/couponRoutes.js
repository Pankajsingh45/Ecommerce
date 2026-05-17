import express from "express";
import {
  addCoupon,
  getCoupons,
  applyCoupon,
} from "../controllers/couponController.js";

const router = express.Router();

router.post("/", addCoupon);
router.get("/", getCoupons);
router.post("/apply", applyCoupon);

export default router;
