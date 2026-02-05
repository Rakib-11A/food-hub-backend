import { Router } from "express";
import { mealController } from "./meals.controllers.js";
const router = Router();
router.get('/', mealController.getMeals);
router.get('/:id', mealController.getMealById);
export default router;
//# sourceMappingURL=meals.routes.js.map