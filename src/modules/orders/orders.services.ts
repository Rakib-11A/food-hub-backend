import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createOrder = async (
    data: {
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
    }
) => {
    const meals = await prisma.meal.findMany({
        where: {
            id: { in: data.items.map((i) => i.mealId) },
            providerProfileId: data.providerProfileId,
            isAvailable: true
        },
    });
    if (meals.length !== data.items.length){
        throw new Error("Invalid meal(s) or provider");
    }
    const itemMap = new Map(meals.map((m) => [m.id, m]));
    let totalAmount = 0;
    const orderItems = data.items.map((i) => {
        const meal = itemMap.get(i.mealId);
        if(!meal) throw new Error("Meal not found");
        const unitPrice = Number(meal.price);
        const subtotal = unitPrice * i.quantity;
        totalAmount += subtotal;
        return {
            mealId: i.mealId, 
            quantity: i.quantity,
            unitPrice,
            subtotal
        };
    });
    const order = await prisma.order.create({
        data: {
            customerId: data.customerId,
            providerProfileId: data.providerProfileId,
            deliveryAddress: data.deliveryAddress,
            contactPhone: data.deliveryAddress,
            paymentMethod: data.paymentMethod ?? "COD",
            notes: data.notes ?? null,
            totalAmount,
            items: {
                create: orderItems.map((i) => ({
                    mealId: i.mealId,
                    quantity: i.quantity,
                    unitPrice: i.unitPrice,
                    subtotal: i.subtotal,
                })),
            },
        },
        include: {
            items: {
                include: {
                    meal: true
                }
            },
            providerProfile: true
        },
    });

    return order
}

const getOrdersByCustomerId = async (customerId: string) => {
    return await prisma.order.findMany({
        where: { customerId },
        include: {
            items: {
                include: {
                    meal: true
                }
            },
            providerProfile: {
                select: {
                    id: true,
                    businessName: true
                }
            }
        },
        orderBy: { placedAt: "desc" }
    })
}

const getOrderById = async ( id: string ) => {
    return await prisma.order.findUnique({
        where: { id },
        include: {
            items: {
                include: {
                    meal: true
                }
            },
            providerProfile: true,
            customer: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        },
    });
};

const getOrdersByProviderProfileId = async (providerProfileId: string ) => {
    return await prisma.order.findMany({
        where: { providerProfileId },
        include: {
            items: {
                include: {
                    meal: true,
                }
            },
            customer: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        },
        orderBy: { placedAt: "desc" },
    });
};

const updateOrderStatus = async (id: string, providerProfileId: string, status: OrderStatus) => {
    const order = await prisma.order.findFirst({
        where: { id, providerProfileId }
    });
    if(!order){
        throw Object.assign(new Error("Order not found"), { code: "P2025"});
    }
    return await prisma.order.update({
        where: { id },
        data: { status },
        include: {
            items: {
                include: {
                    meal: true
                }
            },
            providerProfile: true
        },
    });
};

export const orderService = {
    createOrder,
    getOrdersByCustomerId,
    getOrderById,
    getOrdersByProviderProfileId,
    updateOrderStatus,
}