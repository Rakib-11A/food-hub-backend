import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { UserRole } from "../../interfaces/role.interface.js";
import { providerOrderController } from "./provider-orders.controllers.js";

const router = Router();

router.get("/", authenticate(UserRole.PROVIDER), providerOrderController.getMyOrders);
router.patch(
  "/:id",
  authenticate(UserRole.PROVIDER),
  providerOrderController.updateOrderStatus
);

export default router;
