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

export const categoryService = {
    getCategories
}
