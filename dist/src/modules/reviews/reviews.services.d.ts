export declare function getReviewsByMealId(mealId: string): Promise<({
    user: {
        name: string;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    orderId: string | null;
    mealId: string;
    rating: number;
    comment: string | null;
})[]>;
export declare function createReview(data: {
    userId: string;
    mealId: string;
    rating: number;
    comment?: string | null;
    orderId?: string | null;
}): Promise<{
    user: {
        name: string;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    orderId: string | null;
    mealId: string;
    rating: number;
    comment: string | null;
}>;
//# sourceMappingURL=reviews.services.d.ts.map