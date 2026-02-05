import { prisma } from "../../lib/prisma.js";

export async function getReviewsByMealId(mealId: string) {
  return prisma.review.findMany({
    where: { mealId },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true } },
    },
  });
}

export async function createReview(data: {
  userId: string;
  mealId: string;
  rating: number;
  comment?: string | null;
  orderId?: string | null;
}) {
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
