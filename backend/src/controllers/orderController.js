import prisma from "../config/db.js";

export const createOrder = async (req, res) => {
  try {
    const { total, status } = req.body;

    const order = await prisma.order.create({
      data: {
        total: Number(total),
        status: status || "pending",
      },
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
