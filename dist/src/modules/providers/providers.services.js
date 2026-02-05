import { prisma } from "../../lib/prisma.js";
export const providerService = {
    async getProviders() {
        return prisma.providerProfile.findMany({
            include: { user: { select: { name: true, email: true } } },
        });
    },
    async getProviderById(id) {
        return prisma.providerProfile.findUnique({
            where: { id },
            include: { user: { select: { name: true, email: true } } },
        });
    },
    async createProviderProfile(userId, data) {
        return prisma.providerProfile.create({
            data: { userId, ...data },
        });
    },
    async updateProviderProfile(userId, data) {
        const allowed = ["businessName", "description", "address", "phone", "logo"];
        const update = {};
        for (const key of allowed) {
            if (data[key] !== undefined)
                update[key] = String(data[key]);
        }
        return prisma.providerProfile.update({
            where: { userId },
            data: update,
        });
    },
};
//# sourceMappingURL=providers.services.js.map