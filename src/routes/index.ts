import { Router } from "express";
import categoryRoutes from "../modules/category/category.routes";
import mealRouters from "../modules/meals/meals.routes";
import providersRouters from "../modules/providers/providers.routes"
import providerProfileRoutes from "../modules/provider/provider-profile.routes";

const router = Router();

router.use("/categories", categoryRoutes);
router.use("/meals", mealRouters);
router.use("/providers", providersRouters)
router.use("/provider", providerProfileRoutes)

export default router;
