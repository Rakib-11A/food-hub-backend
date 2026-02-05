import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { categoryController } from "./category.controllers.js";
import { UserRole } from "../../interfaces/role.interface.js";
const router = Router();
router.get("/", categoryController.getCategories);
router.post('/', authenticate(UserRole.ADMIN), categoryController.createCategory);
router.put("/:id", authenticate(UserRole.ADMIN), categoryController.updateCategory);
router.delete("/:id", authenticate(UserRole.ADMIN), categoryController.deleteCategory);
export default router;
//# sourceMappingURL=category.routes.js.map