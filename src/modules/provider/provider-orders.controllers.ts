import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { prisma } from "../../lib/prisma.js";
import { providerOrderService } from "./provider-orders.services.js";

const VALID_STATUSES = ["PLACED", "PREPARING", "READY", "DELIVERED", "CANCELLED"] as const;

export const providerOrderController = {
  getMyOrders: asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const profile = await prisma.providerProfile.findUnique({
      where: { userId: user.id },
    });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found. Create a provider profile first.",
      });
    }
    const orders = await providerOrderService.getOrdersByProviderProfileId(profile.id);
    res.status(200).json({ success: true, data: orders });
  }),

  updateOrderStatus: asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const profile = await prisma.providerProfile.findUnique({
      where: { userId: user.id },
    });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }
    const orderId = req.params.id as string;
    const { status } = req.body as { status: string };
    if (!status || !VALID_STATUSES.includes(status as typeof VALID_STATUSES[number])) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }
    const order = await providerOrderService.updateOrderStatus(
      orderId,
      profile.id,
      status as typeof VALID_STATUSES[number]
    );
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  }),
};
