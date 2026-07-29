import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getDashboard = async (
  _req: Request,
  res: Response
) => {
try {
  const totalCustomers = await prisma.customer.count();

  const totalProducts = await prisma.product.count();

  const totalChallans = await prisma.salesChallan.count();

  const revenue = await prisma.salesChallan.aggregate({
    _sum: {
      totalAmount: true,
    },
  });

  return res.status(200).json({
    success: true,
    data: {
      totalCustomers,
      totalProducts,
      totalChallans,
      totalRevenue: revenue._sum.totalAmount || 0,
    },
  });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};