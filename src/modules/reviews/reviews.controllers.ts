import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import * as reviewService from "./reviews.services";

export const getReviewsByMeal = asyncHandler(async (req: Request, res: Response) => {
  const mealId = req.params.mealId as string;
  if (!mealId) {
    return res.status(400).json({ success: false, message: "mealId is required" });
  }
  const reviews = await reviewService.getReviewsByMealId(mealId);
  res.status(200).json({ success: true, data: reviews });
});

export const createReview = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const { mealId, rating, comment } = req.body as {
    mealId?: string;
    rating?: number;
    comment?: string;
  };
  if (!mealId || typeof mealId !== "string" || !mealId.trim()) {
    return res.status(400).json({ success: false, message: "mealId is required" });
  }
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: "rating must be 1–5" });
  }
  const review = await reviewService.createReview({
    userId: user.id,
    mealId: mealId.trim(),
    rating,
    comment: comment?.trim() || null,
  });
  res.status(201).json({ success: true, data: review });
});
