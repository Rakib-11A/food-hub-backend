import type { UserStatus } from "../../../generated/prisma/client.js";
export declare const adminService: {
    getUsers(): Promise<{
        createdAt: string;
        updatedAt: string;
        name: string;
        role: import("../../../generated/prisma/enums.js").UserRole;
        status: UserStatus;
        id: string;
        email: string;
        emailVerified: boolean;
    }[]>;
    updateUserStatus(userId: string, status: UserStatus): Promise<{
        name: string;
        role: import("../../../generated/prisma/enums.js").UserRole;
        status: UserStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
    }>;
    getOrders(): Promise<{
        totalAmount: string;
        placedAt: string;
        updatedAt: string;
        items: {
            unitPrice: string;
            subtotal: string | null;
            meal: {
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
            };
            id: string;
            orderId: string;
            mealId: string;
            quantity: number;
        }[];
        providerProfile: {
            id: string;
            businessName: string;
        };
        customer: {
            name: string;
            id: string;
            email: string;
        };
        status: import("../../../generated/prisma/enums.js").OrderStatus;
        id: string;
        providerProfileId: string;
        customerId: string;
        deliveryAddress: string;
        contactPhone: string | null;
        paymentMethod: string | null;
        notes: string | null;
    }[]>;
};
//# sourceMappingURL=admin.services.d.ts.map