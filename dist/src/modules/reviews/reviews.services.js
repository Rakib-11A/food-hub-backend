import { prisma } from "../../lib/prisma.js";
export async function getReviewsByMealId(mealId) {
    return prisma.review.findMany({
        where: { mealId },
        orderBy: { createdAt: "desc" },
        include: {
            user: { select: { name: true } },
        },
    });
}
export async function createReview(data) {
    return prisma.review.create({
        data: {
            userId: data.userId,
            mealId: data.mealId,
            rating: data.rating,
            comment: data.comment ?? null,
            orderId: data.orderId ?? null,
        },
        include: {
            user: { select: { name: true } },
        },
    });
}
//# sourceMappingURL=reviews.services.js.map