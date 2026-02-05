import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { UserRole } from "../../interfaces/role.interface.js";
import { adminController } from "./admin.controllers.js";

const router = Router();

router.get("/users", authenticate(UserRole.ADMIN), adminController.getUsers);
router.patch(
  "/users/:id",
  authenticate(UserRole.ADMIN),
  adminController.updateUserStatus
);
router.get("/orders", authenticate(UserRole.ADMIN), adminController.getOrders);

export default router;
