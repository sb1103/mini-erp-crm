import { Request, Response } from "express";
import prisma from "../config/prisma";

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, sku, price, stock } = req.body;

    const existingProduct = await prisma.product.findUnique({
      where: { sku },
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with this SKU already exists",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        price: Number(price),
        stock: Number(stock),
      },
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Products
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Product By ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, sku, price, stock } = req.body;

    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name,
        sku,
        price: Number(price),
        stock: Number(stock),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};