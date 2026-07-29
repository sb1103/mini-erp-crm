import { Request, Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

// ================= CREATE CHALLAN =================

export const createChallan = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { customerId, items } = req.body;

    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    let totalAmount = 0;

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: {
          id: item.productId,
        },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.productId} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} has insufficient stock`,
        });
      }

      totalAmount += product.price * item.quantity;
    }

    const challan = await prisma.salesChallan.create({
      data: {
        customerId,
        createdById: req.user!.id,
        totalAmount,
      },
    });

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: {
          id: item.productId,
        },
      });

      await prisma.salesChallanItem.create({
        data: {
          challanId: challan.id,
          productId: item.productId,
          quantity: item.quantity,
          price: product!.price,
        },
      });

      await prisma.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return res.status(201).json({
      success: true,
      message: "Sales Challan created successfully",
      data: challan,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= GET ALL =================

export const getChallans = async (_req: Request, res: Response) => {
  try {
    const challans = await prisma.salesChallan.findMany({
      include: {
        customer: true,
        createdBy: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: challans,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= GET ONE =================

export const getChallanById = async (
  req: Request,
  res: Response
) => {
  try {
    const challan = await prisma.salesChallan.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        customer: true,
        createdBy: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!challan) {
      return res.status(404).json({
        success: false,
        message: "Challan not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: challan,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= DELETE =================

export const deleteChallan = async (
  req: Request,
  res: Response
) => {
  try {
    const challanId = Number(req.params.id);

    await prisma.salesChallanItem.deleteMany({
      where: {
        challanId,
      },
    });

    await prisma.salesChallan.delete({
      where: {
        id: challanId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Challan deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};