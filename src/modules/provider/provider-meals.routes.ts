import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { UserRole } from "../../interfaces/role.interface.js";
import { mealController } from "../meals/meals.controllers.js";

const router = Router();

router.get("/", authenticate(UserRole.PROVIDER), mealController.getMyMeals);
router.post("/", authenticate(UserRole.PROVIDER), mealController.createMeal);
router.put("/:id", authenticate(UserRole.PROVIDER), mealController.updateMeal);
router.delete("/:id", authenticate(UserRole.PROVIDER), mealController.deleteMeal);

export default router;
