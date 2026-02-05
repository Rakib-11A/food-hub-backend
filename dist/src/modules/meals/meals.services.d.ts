import { Meal } from "../../../generated/prisma/client.js";
type MealCreateInput = Omit<Meal, "id" | "createdAt" | "updatedAt">;
type MealUpdateInput = Partial<Pick<Meal, "name" | "description" | "price" | "image" | "dietaryTags" | "categoryId" | "isAvailable">>;
export declare const mealService: {
    createMeal: (data: MealCreateInput, providerProfileId: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        description: string | null;
        providerProfileId: string;
        categoryId: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        dietaryTags: string[];
        isAvailable: boolean;
    }>;
    getMeals: (filters: {
        categoryId?: string;
        dietary?: string;
        minPrice?: number;
        maxPrice?: number;
    }) => Promise<({
        category: {
            name: string;
            id: string;
        } | null;
        providerProfile: {
            id: string;
            businessName: string;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        description: string | null;
        providerProfileId: string;
        categoryId: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        dietaryTags: string[];
        isAvailable: boolean;
    })[]>;
    getMealById: (id: string) => Promise<({
        category: {
            name: string;
            id: string;
        } | null;
        providerProfile: {
            id: string;
            businessName: string;
            address: string | null;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        description: string | null;
        providerProfileId: string;
        categoryId: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        dietaryTags: string[];
        isAvailable: boolean;
    }) | null>;
    updateMeal: (id: string, data: MealUpdateInput, providerProfileId: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        description: string | null;
        providerProfileId: string;
        categoryId: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        dietaryTags: string[];
        isAvailable: boolean;
    }>;
    deleteMeal: (id: string, providerProfileId: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        description: string | null;
        providerProfileId: string;
        categoryId: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        dietaryTags: string[];
        isAvailable: boolean;
    }>;
};
export {};
//# sourceMappingURL=meals.services.d.ts.map