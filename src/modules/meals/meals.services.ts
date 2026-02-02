import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { Meal } from "../../../generated/prisma/client";

const createMeal = async(data: Omit<Meal, "id" | "createdAt" | "updatedAt"> ,providerProfileId: string) => {
    const meal = await prisma.meal.create({
        data: {
            ...data,
            providerProfileId: providerProfileId,
        }
    })
    return meal;
}

export const mealService = {
    createMeal
}
