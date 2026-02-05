import { Router } from "express";
import { providerController } from "./providers.controller.js";

const router = Router();

router.get("/", providerController.getProviders);
router.get("/:id", providerController.getProviderById);

export default router;
