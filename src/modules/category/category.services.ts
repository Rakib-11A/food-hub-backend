import { prisma } from "../../lib/prisma";

const getCategories = async () => {
    const list = await prisma.category.findMany({
        where: {
            isActive: true
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
    return list;
}

const createCategory = async (data: {
    name: string;
    slug?: string;
    description?: string;
    image?: string;
    sortOrder?: number;
}) => {
    return await prisma.category.create({data})
}

const updateCategory = async (id: string, data: {
    name?:string;
    slug?: string;
    description?: string;
    image?: string;
    sortOrder?: number;
    isActive?: boolean;
}) => {
    return await prisma.category.update({
        where: {
            id
        },
        data
    })
}

const deleteCategory = async (id: string) => {
    return await prisma.category.delete({
        where: { id }
    })
}

export const categoryService = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}
