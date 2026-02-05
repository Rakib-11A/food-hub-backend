import { prisma } from "../../lib/prisma.js";
const createMeal = async (data, providerProfileId) => {
    return await prisma.meal.create({
        data: {
            ...data,
            providerProfileId
        }
    });
};
const getMeals = async (filters) => {
    const where = { isAvailable: true };
    if (filters.categoryId)
        where.categoryId = filters.categoryId;
    if (filters.dietary)
        where.dietaryTags = { has: filters.dietary };
    if (filters.minPrice != null || filters.maxPrice != null) {
        where.price = {};
        if (filters.minPrice != null) {
            where.price.gte = filters.minPrice;
        }
        if (filters.maxPrice != null) {
            where.price.lte = filters.maxPrice;
        }
    }
    return await prisma.meal.findMany({
        where,
        include: {
            providerProfile: {
                select: {
                    id: true,
                    businessName: true
                }
            },
            category: {
                select: {
                    id: true,
                    name: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        }
    });
};
const getMealById = async (id) => {
    return await prisma.meal.findUnique({
        where: {
            id
        },
        include: {
            providerProfile: {
                select: {
                    id: true,
                    businessName: true,
                    address: true
                }
            },
            category: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
};
const updateMeal = async (id, data, providerProfileId) => {
    const exists = await prisma.meal.findFirst({
        where: {
            id,
            providerProfileId
        }
    });
    if (!exists) {
        throw Object.assign(new Error("Meal not found"), { code: "P2025" });
    }
    return prisma.meal.update({
        where: { id }, data
    });
};
const deleteMeal = async (id, providerProfileId) => {
    const exists = await prisma.meal.findFirst({
        where: { id, providerProfileId },
    });
    if (!exists) {
        throw Object.assign(new Error("Meal not found"), { code: "P2025" });
    }
    return await prisma.meal.delete({
        where: { id },
    });
};
export const mealService = {
    createMeal,
    getMeals,
    getMealById,
    updateMeal,
    deleteMeal
};
//# sourceMappingURL=meals.services.js.map