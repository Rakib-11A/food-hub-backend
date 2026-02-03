import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { UserRole } from "../../interfaces/role.interface";

const router = Router();

router.use(authenticate(UserRole.PROVIDER));

// router.get("/", orderController.getProviderOrders);
// router.get("/", orderController.updateOrderStatus);

export default router;