import type { OrderStatus } from "../../../generated/prisma/client";
export declare const providerOrderService: {
    getOrdersByProviderProfileId(providerProfileId: string): Promise<{
        totalAmount: string;
        placedAt: string;
        updatedAt: string;
        items: {
            unitPrice: string;
            subtotal: string | null;
            meal: {
                price: string;
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                image: string | null;
                description: string | null;
                providerProfileId: string;
                categoryId: string | null;
                dietaryTags: string[];
                isAvailable: boolean;
            } | null;
            id: string;
            orderId: string;
            mealId: string;
            quantity: number;
        }[];
        customer: {
            name: string;
            id: string;
            email: string;
        };
        status: OrderStatus;
        id: string;
        providerProfileId: string;
        customerId: string;
        deliveryAddress: string;
        contactPhone: string | null;
        paymentMethod: string | null;
        notes: string | null;
    }[]>;
    updateOrderStatus(orderId: string, providerProfileId: string, status: OrderStatus): Promise<{
        totalAmount: string;
        placedAt: string;
        updatedAt: string;
        items: {
            unitPrice: string;
            subtotal: string | null;
            meal: {
                price: string;
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                image: string | null;
                description: string | null;
                providerProfileId: string;
                categoryId: string | null;
                dietaryTags: string[];
                isAvailable: boolean;
            } | null;
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
        status: OrderStatus;
        id: string;
        providerProfileId: string;
        customerId: string;
        deliveryAddress: string;
        contactPhone: string | null;
        paymentMethod: string | null;
        notes: string | null;
    } | null>;
};
//# sourceMappingURL=provider-orders.services.d.ts.map