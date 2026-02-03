import { asyncHandler } from "../../utils/asyncHandler";
import { reviewService } from "./reviews.services";
const createReview = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user)
        return res.status(401).json({ success: false, message: "Unauthorized!" });
    const { mealId, orderId, rating, comment } = req.body;
    if (!mealId || rating == null)
        return res.status(400).json({ success: false, message: "mealId and rating required" });
    if (rating < 1 || rating > 5)
        return res.status(400).json({ success: false, message: "rating must be 1-5" });
    const result = await reviewService.createReview({
        userId: user.id,
        mealId,
        orderId,
        rating: Number(rating),
        comment,
    });
    res.status(201).json({ success: true, message: "Review added", data: result });
});
const getReviews = asyncHandler(async (req, res) => {
    const limit = req.query.limit;
    const result = await reviewService.getReviews(limit ? Number(limit) : undefined);
    res.status(200).json({ success: true, message: "Reviews fetched", data: result });
});
const getReviewsByMealId = asyncHandler(async (req, res) => {
    const mealId = req.params.mealId;
    const result = await reviewService.getReviewsByMealId(mealId);
    res.status(200).json({ success: true, message: "Reviews fetched", data: result });
});
export const reviewController = {
    createReview,
    getReviews,
    getReviewsByMealId,
};
//# sourceMappingURL=reviews.controllers.js.map