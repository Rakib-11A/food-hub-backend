import { Router } from "express";
import { mealController } from "./meals.controllers.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { UserRole } from "../../interfaces/role.interface.js";

const router = Router();

router.get('/', mealController.getMeals);
router.get('/:id', mealController.getMealById);

export default router;
