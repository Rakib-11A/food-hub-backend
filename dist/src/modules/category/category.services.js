import { prisma } from "../../lib/prisma.js";
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
};
const createCategory = async (data) => {
    return await prisma.category.create({ data });
};
const updateCategory = async (id, data) => {
    return await prisma.category.update({
        where: {
            id
        },
        data
    });
};
const deleteCategory = async (id) => {
    return await prisma.category.delete({
        where: { id }
    });
};
export const categoryService = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
//# sourceMappingURL=category.services.js.map