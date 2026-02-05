import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { UserRole } from "../../interfaces/role.interface";
import { adminController } from "./admin.controllers";
const router = Router();
router.get("/users", authenticate(UserRole.ADMIN), adminController.getUsers);
router.patch("/users/:id", authenticate(UserRole.ADMIN), adminController.updateUserStatus);
router.get("/orders", authenticate(UserRole.ADMIN), adminController.getOrders);
export default router;
//# sourceMappingURL=admin.routes.js.map