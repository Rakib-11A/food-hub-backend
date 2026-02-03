import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { UserRole } from "../../interfaces/role.interface";
import { reviewController } from "./reviews.controllers";

const router = Router();

router.get("/", reviewController.getReviews);
router.get("/meal/:mealId", reviewController.getReviewsByMealId);
router.post("/", authenticate(UserRole.CUSTOMER), reviewController.createReview);

export default router;
