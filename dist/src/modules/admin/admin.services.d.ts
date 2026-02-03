import type { UserStatus } from "../../../generated/prisma/client";
export declare const adminService: {
    getAllUsers: () => Promise<{
        name: string;
        role: import("../../../generated/prisma/enums").UserRole;
        status: UserStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
    }[]>;
    updateUserStatus: (id: string, status: UserStatus) => Promise<{
        name: string;
        role: import("../../../generated/prisma/enums").UserRole;
        status: UserStatus;
        id: string;
        email: string;
    }>;
    getAllOrders: () => Promise<({
        providerProfile: {
            id: string;
            businessName: string;
        };
        customer: {
            name: string;
            id: string;
            email: string;
        };
        items: ({
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
        } & {
            id: string;
            quantity: number;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            subtotal: import("@prisma/client-runtime-utils").Decimal | null;
            mealId: string;
            orderId: string;
        })[];
    } & {
        status: import("../../../generated/prisma/enums").OrderStatus;
        id: string;
        updatedAt: Date;
        providerProfileId: string;
        deliveryAddress: string;
        contactPhone: string | null;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        paymentMethod: string | null;
        notes: string | null;
        placedAt: Date;
        customerId: string;
    })[]>;
};
//# sourceMappingURL=admin.services.d.ts.map