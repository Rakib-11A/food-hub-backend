import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { adminController } from "./admin.controllers";
import { UserRole } from "../../interfaces/role.interface";
const router = Router();
router.use(authenticate(UserRole.ADMIN));
router.get("/users", adminController.getUsers);
router.patch("/users/:id", adminController.updateUserStatus);
router.get("/orders", adminController.getOrders);
export default router;
//# sourceMappingURL=admin.routes.js.map