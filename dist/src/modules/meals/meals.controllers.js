import { asyncHandler } from "../../utils/asyncHandler.js";
import { mealService } from "./meals.services.js";
import { prisma } from "../../lib/prisma.js";
const createMeal = asyncHandler(async (req, res) => {
    const user = req?.user;
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized!",
        });
    }
    // Finding Provider using user_id
    const profile = await prisma.providerProfile.findUnique({
        where: { userId: user.id },
    });
    if (!profile) {
        return res.status(400).json({
            success: false,
            message: "Create a provider profile first",
        });
    }
    const result = await mealService.createMeal(req.body, profile.id);
    res.status(201).json({
        success: true,
        message: "Meal created successfully",
        data: result,
    });
});
const getMeals = asyncHandler(async (req, res) => {
    const { categoryId, dietary, minPrice, maxPrice } = req.query;
    // console.log({categoryId, dietary, minPrice, maxPrice});
    const filters = {};
    if (categoryId != null)
        filters.categoryId = String(categoryId);
    if (dietary != null)
        filters.dietary = String(dietary);
    if (minPrice != null)
        filters.minPrice = Number(minPrice);
    if (maxPrice != null)
        filters.maxPrice = Number(maxPrice);
    // console.log(filters)
    const result = await mealService.getMeals(filters);
    res.status(200).json({
        success: true,
        message: "Meals fetched",
        data: result
    });
});
const getMealById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await mealService.getMealById(id);
    res.status(200).json({
        success: true,
        message: "Meal fetched",
        data: result
    });
});
const updateMeal = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = req?.user;
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized!",
        });
    }
    const profile = await prisma.providerProfile.findUnique({
        where: { userId: user.id },
    });
    if (!profile) {
        return res.status(400).json({
            success: false,
            message: "Create a provider profile first"
        });
    }
    const result = await mealService.updateMeal(id, req.body, profile.id);
    res.status(200).json({
        success: true,
        message: "Meal Updated",
        data: result
    });
});
const deleteMeal = asyncHandler(async (req, res) => {
    const user = req?.user;
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized!",
        });
    }
    const profile = await prisma.providerProfile.findUnique({
        where: {
            userId: user.id
        }
    });
    if (!profile) {
        return res.status(400).json({
            success: false,
            message: "Create a provider profile first"
        });
    }
    const id = req.params.id;
    const result = await mealService.deleteMeal(id, profile.id);
    res.status(200).json({
        success: true,
        message: "Meal removed",
        data: result
    });
});
export const mealController = {
    createMeal,
    getMeals,
    getMealById,
    updateMeal,
    deleteMeal
};
//# sourceMappingURL=meals.controllers.js.map