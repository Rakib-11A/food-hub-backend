import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import * as reviewsController from "./reviews.controllers.js";

const router = Router();

router.get("/meal/:mealId", reviewsController.getReviewsByMeal);
router.post("/", authenticate(), reviewsController.createReview);

export default router;
