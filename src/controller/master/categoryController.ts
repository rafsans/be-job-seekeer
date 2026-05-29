import { Request, Response } from "express";
import prisma from "../../config/db.js";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.jobCategory.findMany({
      orderBy: { name: "asc" },
    });

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error: any) {
    console.error("Error in getAllCategories:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
