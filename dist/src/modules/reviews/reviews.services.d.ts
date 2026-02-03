export declare const reviewService: {
    createReview: (data: {
        userId: string;
        mealId: string;
        orderId?: string;
        rating: number;
        comment?: string;
    }) => Promise<{
        user: {
            name: string;
            id: string;
        };
        meal: {
            name: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        mealId: string;
        orderId: string | null;
        rating: number;
        comment: string | null;
    }>;
    getReviews: (limit?: number) => Promise<({
        user: {
            name: string;
            id: string;
        };
        meal: {
            name: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        mealId: string;
        orderId: string | null;
        rating: number;
        comment: string | null;
    })[]>;
    getReviewsByMealId: (mealId: string) => Promise<({
        user: {
            name: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        mealId: string;
        orderId: string | null;
        rating: number;
        comment: string | null;
    })[]>;
};
//# sourceMappingURL=reviews.services.d.ts.map