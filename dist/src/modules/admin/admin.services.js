import { prisma } from "../../lib/prisma";
const getAllUsers = async () => {
    return prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, status: true, emailVerified: true, createdAt: true, updatedAt: true },
        orderBy: { createdAt: "desc" },
    });
};
const updateUserStatus = async (id, status) => {
    return prisma.user.update({
        where: { id },
        data: { status },
        select: { id: true, name: true, email: true, role: true, status: true },
    });
};
const getAllOrders = async () => {
    return prisma.order.findMany({
        include: {
            items: { include: { meal: true } },
            providerProfile: { select: { id: true, businessName: true } },
            customer: { select: { id: true, name: true, email: true } },
        },
        orderBy: { placedAt: "desc" },
    });
};
export const adminService = {
    getAllUsers,
    updateUserStatus,
    getAllOrders,
};
//# sourceMappingURL=admin.services.js.map