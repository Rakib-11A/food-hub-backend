import { Router } from "express";
import { providerController } from "./providers.controller";

const router = Router();

router.get("/", providerController.getProviders);
router.get("/:id", providerController.getProviderById);

export default router;
