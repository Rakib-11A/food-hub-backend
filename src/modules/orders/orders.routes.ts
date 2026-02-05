import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { orderController } from "./orders.controllers.js";

const router = Router();

router.get("/", authenticate(), orderController.getMyOrders);
router.get("/:id", authenticate(), orderController.getOrderById);
router.post("/", authenticate(), orderController.createOrder);

export default router;
