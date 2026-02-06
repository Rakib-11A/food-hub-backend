import { prisma } from "../../lib/prisma.js";

export const providerService = {
  async getProviders() {
    return prisma.providerProfile.findMany({
      include: { user: { select: { name: true, email: true } } },
    });
  },
  async getProviderById(id: string) {
    return prisma.providerProfile.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true } },
        meals: {
          where: { isAvailable: true },
          include: { category: { select: { id: true, name: true } } },
        },
      },
    });
  },
  async createProviderProfile(
    userId: string,
    data: {
      businessName: string;
      description?: string;
      address?: string;
      phone?: string;
      logo?: string;
    }
  ) {
    return prisma.providerProfile.create({
      data: { userId, ...data },
    });
  },
  async updateProviderProfile(userId: string, data: Record<string, unknown>) {
    const allowed = ["businessName", "description", "address", "phone", "logo"] as const;
    const update: Record<string, string> = {};
    for (const key of allowed) {
      if (data[key] !== undefined) update[key] = String(data[key]);
    }
    return prisma.providerProfile.update({
      where: { userId },
      data: update as { businessName?: string; description?: string; address?: string; phone?: string; logo?: string },
    });
  },
};
