import { prisma } from "../../lib/prisma.js";
export const orderService = {
    async getOrdersByCustomerId(customerId) {
        const orders = await prisma.order.findMany({
            where: { customerId },
            orderBy: { placedAt: "desc" },
            include: {
                items: { include: { meal: true } },
                providerProfile: { select: { id: true, businessName: true } },
            },
        });
        return orders.map((o) => ({
            ...o,
            totalAmount: String(o.totalAmount),
            placedAt: o.placedAt.toISOString(),
            updatedAt: o.updatedAt.toISOString(),
            items: o.items.map((i) => ({
                ...i,
                unitPrice: String(i.unitPrice),
                subtotal: i.subtotal != null ? String(i.subtotal) : null,
                meal: i.meal
                    ? { ...i.meal, price: String(i.meal.price) }
                    : null,
            })),
        }));
    },
    async getOrderById(orderId, customerId) {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: { include: { meal: true } },
                providerProfile: { select: { id: true, businessName: true } },
                customer: { select: { id: true, name: true, email: true } },
            },
        });
        if (!order)
            return null;
        if (customerId && order.customerId !== customerId)
            return null;
        return {
            ...order,
            totalAmount: String(order.totalAmount),
            placedAt: order.placedAt.toISOString(),
            updatedAt: order.updatedAt.toISOString(),
            items: order.items.map((i) => ({
                ...i,
                unitPrice: String(i.unitPrice),
                subtotal: i.subtotal != null ? String(i.subtotal) : null,
                meal: i.meal ? { ...i.meal, price: String(i.meal.price) } : null,
            })),
        };
    },
    async createOrder(customerId, body) {
        const mealIds = [...new Set(body.items.map((i) => i.mealId))];
        const meals = await prisma.meal.findMany({
            where: {
                id: { in: mealIds },
                providerProfileId: body.providerProfileId,
            },
            select: { id: true, price: true, isAvailable: true },
        });
        const mealMap = new Map(meals.map((m) => [m.id, m]));
        const missing = [];
        const unavailable = [];
        for (const item of body.items) {
            const meal = mealMap.get(item.mealId);
            if (!meal)
                missing.push(item.mealId);
            else if (!meal.isAvailable)
                unavailable.push(item.mealId);
        }
        if (missing.length > 0 || unavailable.length > 0) {
            const parts = [];
            if (missing.length > 0)
                parts.push("not found or from another provider");
            if (unavailable.length > 0)
                parts.push("no longer available");
            throw new Error(`Some items could not be ordered: ${parts.join("; ")}. Please remove them from your cart and try again.`);
        }
        let totalAmount = 0;
        const orderItems = [];
        for (const item of body.items) {
            const meal = mealMap.get(item.mealId);
            const unitPrice = Number(meal.price);
            const subtotal = unitPrice * item.quantity;
            totalAmount += subtotal;
            orderItems.push({
                mealId: item.mealId,
                quantity: item.quantity,
                unitPrice,
                subtotal,
            });
        }
        const order = await prisma.order.create({
            data: {
                customerId,
                providerProfileId: body.providerProfileId,
                deliveryAddress: body.deliveryAddress,
                contactPhone: body.contactPhone ?? null,
                paymentMethod: body.paymentMethod ?? null,
                notes: body.notes ?? null,
                totalAmount,
                items: {
                    create: orderItems,
                },
            },
            include: {
                items: { include: { meal: true } },
                providerProfile: { select: { id: true, businessName: true } },
            },
        });
        return {
            ...order,
            totalAmount: String(order.totalAmount),
            placedAt: order.placedAt.toISOString(),
            updatedAt: order.updatedAt.toISOString(),
            items: order.items.map((i) => ({
                ...i,
                unitPrice: String(i.unitPrice),
                subtotal: i.subtotal != null ? String(i.subtotal) : null,
                meal: i.meal ? { ...i.meal, price: String(i.meal.price) } : null,
            })),
        };
    },
};
//# sourceMappingURL=orders.services.js.map