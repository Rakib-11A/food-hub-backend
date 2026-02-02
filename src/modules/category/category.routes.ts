import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { categoryController } from "./category.controllers";
import { UserRole } from "../../interfaces/role.interface";

const router = Router();

router.get('/', authenticate(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CUSTOMER), categoryController.getCategories);

router.post('/', authenticate(UserRole.ADMIN), categoryController.createCategory);

router.put("/:id", authenticate(UserRole.ADMIN), categoryController.updateCategory);

router.delete("/:id", authenticate(UserRole.ADMIN), categoryController.deleteCategory);

export default router;
