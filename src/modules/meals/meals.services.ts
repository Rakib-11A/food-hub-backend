import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { Meal } from "../../../generated/prisma/client";

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

export const mealService = {
    createMeal
}
