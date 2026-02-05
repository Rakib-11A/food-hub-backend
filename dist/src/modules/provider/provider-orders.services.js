import { prisma } from "../../lib/prisma.js";
export const providerOrderService = {
    async getOrdersByProviderProfileId(providerProfileId) {
        const orders = await prisma.order.findMany({
            where: { providerProfileId },
            orderBy: { placedAt: "desc" },
            include: {
                items: { include: { meal: true } },
                customer: { select: { id: true, name: true, email: true } },
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
                meal: i.meal ? { ...i.meal, price: String(i.meal.price) } : null,
            })),
        }));
    },
    async updateOrderStatus(orderId, providerProfileId, status) {
        const order = await prisma.order.findFirst({
            where: { id: orderId, providerProfileId },
        });
        if (!order)
            return null;
        const updated = await prisma.order.update({
            where: { id: orderId },
            data: { status },
            include: {
                items: { include: { meal: true } },
                providerProfile: { select: { id: true, businessName: true } },
                customer: { select: { id: true, name: true, email: true } },
            },
        });
        return {
            ...updated,
            totalAmount: String(updated.totalAmount),
            placedAt: updated.placedAt.toISOString(),
            updatedAt: updated.updatedAt.toISOString(),
            items: updated.items.map((i) => ({
                ...i,
                unitPrice: String(i.unitPrice),
                subtotal: i.subtotal != null ? String(i.subtotal) : null,
                meal: i.meal ? { ...i.meal, price: String(i.meal.price) } : null,
            })),
        };
    },
};
//# sourceMappingURL=provider-orders.services.js.map