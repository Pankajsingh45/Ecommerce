import prisma from "../config/db.js";

export const createOrder = async (req, res) => {
  try {
    const { total, status } = req.body;

    const order = await prisma.order.create({
      data: {
        total: Number(total),
        status: status || "pending",
        userId: req.user.id, // logged-in user se aaya
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
    // Admin sabhi orders dekh sakta hai, normal user sirf apne
    const whereClause =
      req.user.role === "admin" ? {} : { userId: req.user.id };

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
      orderBy: { id: "desc" },
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
