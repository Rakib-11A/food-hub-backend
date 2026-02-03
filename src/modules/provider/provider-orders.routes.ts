import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { UserRole } from "../../interfaces/role.interface";
import { orderController } from "../orders/orders.controllers";

const router = Router();

router.use(authenticate(UserRole.PROVIDER));
router.get("/", orderController.getProviderOrders);
router.patch("/:id", orderController.updateOrderStatus);

export default router;