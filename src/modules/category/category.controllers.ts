import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { categoryService } from "./category.services";

const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const result = await categoryService.getCategories();
  res.status(200).json({
    success: true,
    message: "All Category fetch successfully...",
    data: result,
  });
});

export const categoryController = {
  getCategories,
};
