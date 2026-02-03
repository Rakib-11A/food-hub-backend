import { prisma } from "../../lib/prisma";
const createReview = async (data) => {
    return prisma.review.create({
        data,
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
            meal: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
};
const getReviews = async (limit = 50) => {
    return prisma.review.findMany({
        take: Math.min(Number(limit) || 50, 100),
        include: {
            user: { select: { id: true, name: true } },
            meal: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
    });
};
const getReviewsByMealId = async (mealId) => {
    return prisma.review.findMany({
        where: { mealId },
        include: { user: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
    });
};
export const reviewService = {
    createReview,
    getReviews,
    getReviewsByMealId,
};
//# sourceMappingURL=reviews.services.js.map