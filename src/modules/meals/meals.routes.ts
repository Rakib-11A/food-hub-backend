import { Router } from "express";
import { mealController } from "./meals.controllers";
import { authenticate } from "../../middlewares/auth.middleware";
import { UserRole } from "../../interfaces/role.interface";

const router = Router();

router.get('/', mealController.getMeals);
router.get('/:id', mealController.getMealById);
router.post('/', authenticate(UserRole.PROVIDER), mealController.createMeal)
router.patch('/:id', authenticate(UserRole.PROVIDER), mealController.updateMeal);
router.delete('/:id', authenticate(UserRole.PROVIDER), mealController.deleteMeal);

export default router;
