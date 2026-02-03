import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { mealController } from "../meals/meals.controllers";
import { UserRole } from "../../interfaces/role.interface";
const router = Router();
router.use(authenticate(UserRole.PROVIDER));
router.post('/', mealController.createMeal);
router.patch('/:id', mealController.updateMeal);
router.delete('/:id', mealController.deleteMeal);
export default router;
//# sourceMappingURL=provider-meals.routes.js.map