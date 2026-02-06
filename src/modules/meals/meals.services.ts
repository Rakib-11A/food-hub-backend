import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { Meal } from "../../../generated/prisma/client.js";

type MealCreateInput = Omit<Meal, "id" | "createdAt" | "updatedAt">;
type MealUpdateInput = Partial<Pick<Meal, "name" | "description" | "price" | "image" | "dietaryTags" | "categoryId" | "isAvailable">>;

const createMeal = async (data: MealCreateInput, providerProfileId: string) => {
    return await prisma.meal.create({
        data: {
            ...data,
            providerProfileId
        }
    })
}

const getMeals = async (
    filters: {
        categoryId?: string;
        dietary?: string;
        minPrice?: number,
        maxPrice?: number
    }
) => {
    const where: {
        isAvailable: boolean;
        categoryId?: string;
        dietaryTags?: { has: string };
        price?: {
            gte?: number;
            lte?: number;
        }
    } = { isAvailable: true }

    if(filters.categoryId) where.categoryId = filters.categoryId;
    if(filters.dietary) where.dietaryTags = { has: filters.dietary };
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
}

const getMealsByProviderProfileId = async (providerProfileId: string) => {
    return await prisma.meal.findMany({
        where: { providerProfileId },
        include: {
            category: {
                select: { id: true, name: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};

const getMealById = async ( id: string ) => {
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
    })
};

const updateMeal = async ( id: string, data: MealUpdateInput, providerProfileId: string ) => {
    const exists = await prisma.meal.findFirst({
        where: {
            id,
            providerProfileId
        }
    });
    if(!exists){
        throw Object.assign(new Error("Meal not found"), { code: "P2025"});
    }
    return prisma.meal.update({
        where: { id }, data
    });
}

const deleteMeal = async (id: string, providerProfileId: string) => {
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
    getMealsByProviderProfileId,
    getMealById,
    updateMeal,
    deleteMeal
}
