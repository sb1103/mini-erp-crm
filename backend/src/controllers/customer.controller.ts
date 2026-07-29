import { Request, Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

// Create Customer
export const createCustomer = async (req: AuthRequest, res: Response) => {
  try {
    const { customerName, phone, email, address, gstNumber } = req.body;

    const customer = await prisma.customer.create({
      data: {
        customerName,
        phone,
        email,
        address,
        gstNumber,
        createdById: req.user!.id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Customers
export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        createdBy: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Customer By ID
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Customer
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { customerName, phone, email, address, gstNumber } = req.body;

    const customer = await prisma.customer.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        customerName,
        phone,
        email,
        address,
        gstNumber,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Customer
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await prisma.customer.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};