import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { orderService } from "./orders.services";
import { success } from "better-auth";

const createOrder = asyncHandler( async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: "Unauthorized!" });
    const { providerProfileId, deliveryAddress, contactPhone, paymentMethod, notes, items } = req.body;
    if (!providerProfileId || !deliveryAddress || !items?.length) {
    return res.status(400).json({ success: false, message: "providerProfileId, deliveryAddress and items required" });
  }
  const result = await orderService.createOrder({
    customerId: user.id,
    providerProfileId,
    deliveryAddress,
    contactPhone,
    paymentMethod: paymentMethod ?? "COD",
    notes,
    items,
  });
  res.status(200).json({
    success: true,
    message: "Order placed",
    data: result
  });
});

const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.status(401).json({ success: false, message: "Unauthorized!" });
  const result = await orderService.getOrdersByCustomerId(user.id);
  res.status(200).json({ success: true, message: "Orders fetched", data: result });
});