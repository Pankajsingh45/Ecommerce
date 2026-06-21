import prisma from "../config/db.js";

export const addCoupon = async (req, res) => {
  try {
    const { code, discount, expiryDate } = req.body;

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        discount: Number(discount),
        expiryDate: new Date(expiryDate),
      },
    });

    res.status(201).json({
      success: true,
      message: "Coupon added successfully",
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCoupons = async (req, res) => {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const applyCoupon = async (req, res) => {
  try {
    const { code, totalAmount } = req.body;

    const coupon = await prisma.coupon.findUnique({
      where: {
        code: code.toUpperCase(),
      },
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid coupon",
      });
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Coupon expired",
      });
    }

    const discountAmount = (Number(totalAmount) * coupon.discount) / 100;
    const finalAmount = Number(totalAmount) - discountAmount;

    res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      discount: coupon.discount,
      discountAmount,
      finalAmount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAvailableCoupons = async (req, res) => {
  try {
    const coupons = await prisma.coupon.findMany({
      where: {
        expiryDate: {
          gte: new Date(),
        },
      },
      select: {
        code: true,
        discount: true,
        expiryDate: true,
      },
      orderBy: {
        discount: "desc",
      },
    });

    res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
