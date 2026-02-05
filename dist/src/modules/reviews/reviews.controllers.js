import { asyncHandler } from "../../utils/asyncHandler.js";
import * as reviewService from "./reviews.services.js";
export const getReviewsByMeal = asyncHandler(async (req, res) => {
    const mealId = req.params.mealId;
    if (!mealId) {
        return res.status(400).json({ success: false, message: "mealId is required" });
    }
    const reviews = await reviewService.getReviewsByMealId(mealId);
    res.status(200).json({ success: true, data: reviews });
});
export const createReview = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { mealId, rating, comment } = req.body;
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
//# sourceMappingURL=reviews.controllers.js.map