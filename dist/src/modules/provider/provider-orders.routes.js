import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { UserRole } from "../../interfaces/role.interface";
import { providerOrderController } from "./provider-orders.controllers";
const router = Router();
router.get("/", authenticate(UserRole.PROVIDER), providerOrderController.getMyOrders);
router.patch("/:id", authenticate(UserRole.PROVIDER), providerOrderController.updateOrderStatus);
export default router;
//# sourceMappingURL=provider-orders.routes.js.map