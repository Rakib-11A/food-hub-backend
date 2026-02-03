import { asyncHandler } from "../../utils/asyncHandler";
import { orderService } from "./orders.services";
import { prisma } from "../../lib/prisma";
const createOrder = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user)
        return res.status(401).json({ success: false, message: "Unauthorized!" });
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
const getMyOrders = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user)
        return res.status(401).json({ success: false, message: "Unauthorized!" });
    const result = await orderService.getOrdersByCustomerId(user.id);
    res.status(200).json({ success: true, message: "Orders fetched", data: result });
});
const getOrderById = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user)
        return res.status(401).json({ success: false, message: "Unauthorized!" });
    const id = req.params.id;
    const order = await orderService.getOrderById(id);
    if (!order)
        return res.status(404).json({ success: false, message: "Order not found" });
    if (order.customerId !== user.id)
        return res.status(403).json({ success: false, message: "Forbidden" });
    res.status(200).json({ success: true, message: "Order fetched", data: order });
});
const getProviderOrders = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user)
        return res.status(401).json({ success: false, message: "Unauthorized!" });
    const profile = await prisma.providerProfile.findUnique({ where: { userId: user.id } });
    if (!profile)
        return res.status(400).json({ success: false, message: "Create a provider profile first" });
    const result = await orderService.getOrdersByProviderProfileId(profile.id);
    res.status(200).json({ success: true, message: "Orders fetched", data: result });
});
const updateOrderStatus = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user)
        return res.status(401).json({ success: false, message: "Unauthorized!" });
    const profile = await prisma.providerProfile.findUnique({ where: { userId: user.id } });
    if (!profile)
        return res.status(400).json({ success: false, message: "Create a provider profile first" });
    const id = req.params.id;
    const { status } = req.body;
    if (!status)
        return res.status(400).json({ success: false, message: "status required" });
    const valid = ["PLACED", "PREPARING", "READY", "DELIVERED", "CANCELLED"];
    if (!valid.includes(status))
        return res.status(400).json({ success: false, message: "Invalid status" });
    const result = await orderService.updateOrderStatus(id, profile.id, status);
    res.status(200).json({ success: true, message: "Order status updated", data: result });
});
export const orderController = {
    createOrder,
    getMyOrders,
    getOrderById,
    getProviderOrders,
    updateOrderStatus,
};
//# sourceMappingURL=orders.controllers.js.map