import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { orderService } from "./orders.services.js";

export const orderController = {
  getMyOrders: asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const orders = await orderService.getOrdersByCustomerId(user.id);
    res.status(200).json({ success: true, data: orders });
  }),

  getOrderById: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const user = req.user;
    const isAdmin = user?.role === "ADMIN";
    const customerId = isAdmin ? undefined : user?.id;
    const order = await orderService.getOrderById(id, customerId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  }),

  createOrder: asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { providerProfileId, deliveryAddress, contactPhone, paymentMethod, notes, items } = req.body;
    if (!providerProfileId || !deliveryAddress || typeof deliveryAddress !== "string" || !items?.length) {
      return res.status(400).json({
        success: false,
        message: "providerProfileId, deliveryAddress, and items are required",
      });
    }
    const order = await orderService.createOrder(user.id, {
      providerProfileId,
      deliveryAddress: deliveryAddress.trim(),
      contactPhone,
      paymentMethod,
      notes,
      items,
    });
    res.status(201).json({ success: true, data: order });
  }),
};
