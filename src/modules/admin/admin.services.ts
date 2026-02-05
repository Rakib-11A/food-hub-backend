import { prisma } from "../../lib/prisma.js";
import type { UserStatus } from "../../../generated/prisma/client.js";

export const adminService = {
  async getUsers() {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users.map((u) => ({
      ...u,
      createdAt: u.createdAt.toISOString(),
      updatedAt: u.updatedAt.toISOString(),
    }));
  },

  async updateUserStatus(userId: string, status: UserStatus) {
    return prisma.user.update({
      where: { id: userId },
      data: { status },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async getOrders() {
    const orders = await prisma.order.findMany({
      orderBy: { placedAt: "desc" },
      include: {
        items: { include: { meal: true } },
        providerProfile: { select: { id: true, businessName: true } },
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
      })),
    }));
  },
};
