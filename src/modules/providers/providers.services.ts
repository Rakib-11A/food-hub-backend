import { prisma } from "../../lib/prisma";

const getProviders = async () => {
    return await prisma.providerProfile.findMany({
        where: { isActive: true},
        include: { _count: { select: { meals: true }}},
        orderBy: { createdAt: "desc" }
    });
};

const getProviderById = async ( id: string ) => {
    return await prisma.providerProfile.findUnique({
        where: { id, isActive: true},
        include: {
            user: { 
               select: {
                name: true,
                email: true,
               }
            },
            meals: {
                where: {
                    isAvailable: true
                },
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            }
        }
    })
}

const createProviderProfile = async (
    userId: string,
    data: {
        businessName: string;
        description?: string;
        address?: string;
        phone?: string;
        logo?: string
    }
) => {
    return await prisma.providerProfile.create({
        data: {
            userId,
            ...data
        }
    })
}

const updateProviderProfile = async (
    userId: string,
    data: {
        businessName?: string;
        description?: string;
        address?: string;
        phone?: string;
        logo?: string;
        isActive?: boolean;
    }
) => {
    const profile = await prisma.providerProfile.findUnique({ where: { userId }});
    if(!profile){
        throw Object.assign(new Error("Provider profile is not found"), { code: 'P2025'});
    }
    return prisma.providerProfile.update({
        where: {
            userId
        },
        data
    })
}

export const providerService = {
    getProviders,
    getProviderById,
    createProviderProfile,
    updateProviderProfile
}