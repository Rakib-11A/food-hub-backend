import { OrderStatus } from "../../../generated/prisma/enums";
export declare const orderService: {
    createOrder: (data: {
        customerId: string;
        providerProfileId: string;
        deliveryAddress: string;
        contactPhone?: string;
        paymentMethod?: string;
        notes?: string;
        items: {
            mealId: string;
            quantity: number;
        }[];
    }) => Promise<{
        providerProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string | null;
            isActive: boolean;
            businessName: string;
            address: string | null;
            phone: string | null;
            logo: string | null;
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
        status: OrderStatus;
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
    }>;
    getOrdersByCustomerId: (customerId: string) => Promise<({
        providerProfile: {
            id: string;
            businessName: string;
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
        status: OrderStatus;
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
    getOrderById: (id: string) => Promise<({
        providerProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string | null;
            isActive: boolean;
            businessName: string;
            address: string | null;
            phone: string | null;
            logo: string | null;
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
        status: OrderStatus;
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
    }) | null>;
    getOrdersByProviderProfileId: (providerProfileId: string) => Promise<({
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
        status: OrderStatus;
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
    updateOrderStatus: (id: string, providerProfileId: string, status: OrderStatus) => Promise<{
        providerProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string | null;
            isActive: boolean;
            businessName: string;
            address: string | null;
            phone: string | null;
            logo: string | null;
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
        status: OrderStatus;
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
    }>;
};
//# sourceMappingURL=orders.services.d.ts.map