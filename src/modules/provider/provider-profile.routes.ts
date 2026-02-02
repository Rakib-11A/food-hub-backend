import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { UserRole } from "../../interfaces/role.interface";
import { providerController } from "../providers/providers.controller";

const router = Router();

router.use(authenticate(UserRole.PROVIDER));

router.post("/profile", providerController.createProviderProfile);
router.patch('/profile/:id', providerController.updateProviderProfile);

export default router;