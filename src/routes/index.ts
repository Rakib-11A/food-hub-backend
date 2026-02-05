import { Router } from "express";
import categoryRoutes from "../modules/category/category.routes.js";
import mealRouters from "../modules/meals/meals.routes.js";
import providersRouters from "../modules/providers/providers.routes.js";
import providerProfileRoutes from "../modules/provider/provider-profile.routes.js";
import providerMealsRoutes from "../modules/provider/provider-meals.routes.js";
import providerOrdersRoutes from "../modules/provider/provider-orders.routes.js";
import ordersRoutes from "../modules/orders/orders.routes.js";
import reviewsRoutes from "../modules/reviews/reviews.routes.js";
import adminRoutes from "../modules/admin/index.js";

const router = Router();

router.use("/categories", categoryRoutes);
router.use("/meals", mealRouters);
router.use("/providers", providersRouters);
router.use("/provider", providerProfileRoutes);
router.use("/provider/meals", providerMealsRoutes);
router.use("/provider/orders", providerOrdersRoutes);
router.use("/orders", ordersRoutes);
router.use("/reviews", reviewsRoutes);
router.use("/admin", adminRoutes);

export default router;
