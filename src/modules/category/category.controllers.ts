import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { categoryService } from "./category.services.js";

const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const result = await categoryService.getCategories();
  res.status(200).json({
    success: true,
    message: "All Category fetch",
    data: result,
  });
});

const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const result = await categoryService.createCategory(req.body)
  res.status(201).json({
    success: true,
    message: "Category created",
    data: result
  })
})

const updateCategory = asyncHandler( async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await categoryService.updateCategory(id, req.body);
  res.status(200).json({
    success: true,
    message: "Category updated",
    data: result
  })
});

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await categoryService.deleteCategory(id);
  res.status(200).json({
    success: true,
    message: "Category deleted",
    data: result
  })
  
})

export const categoryController = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
