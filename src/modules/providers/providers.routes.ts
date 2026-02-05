import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { UserRole } from "../../interfaces/role.interface.js";
import { providerController } from "./providers.controller.js";

const router = Router();

router.get("/", providerController.getProviders);
router.get("/profile", authenticate(UserRole.PROVIDER), providerController.getMyProfile);
router.post("/profile", authenticate(UserRole.PROVIDER), providerController.createProviderProfile);
router.put("/profile", authenticate(UserRole.PROVIDER), providerController.updateProviderProfile);
router.get("/:id", providerController.getProviderById);

export default router;
