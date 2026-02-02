import { Router } from "express";
import categoryRoutes from "../modules/category/category.routes";
import mealRouters from "../modules/meals/meals.routes";

const router = Router();

router.use("/categories", categoryRoutes);
router.use("/meals", mealRouters);

export default router;
