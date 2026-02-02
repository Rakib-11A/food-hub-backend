import { Router } from "express";
import { mealController } from "./meals.controllers";
import { authenticate } from "../../middlewares/auth.middleware";
import { UserRole } from "../../interfaces/role.interface";

const router = Router();

router.post('/', authenticate(UserRole.PROVIDER), mealController.createMeal)

export default router;
