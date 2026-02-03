import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { UserRole } from "../../interfaces/role.interface";
import { orderController } from "./orders.controllers";
const router = Router();
router.post("/", authenticate(UserRole.CUSTOMER), orderController.createOrder);
router.get("/", authenticate(UserRole.CUSTOMER), orderController.getMyOrders);
router.get("/:id", authenticate(UserRole.CUSTOMER), orderController.getOrderById);
export default router;
//# sourceMappingURL=orders.routes.js.map