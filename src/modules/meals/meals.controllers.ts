import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { mealService } from "./meals.services";

const createMeal = asyncHandler(async (req: Request, res: Response) => {
  const user = req?.user;
  if(!user) {
    return res.status(400).json({
        success: false,
        message: "Unauthorized!, user"
    })
  }
  const result = await mealService.createMeal(req.body, user?.id as string);
  
  res.status(201).json({
    success: true,
    message: 'Meal created successfully',
    data: result,
  })
});

export const mealController = {
    createMeal
}
