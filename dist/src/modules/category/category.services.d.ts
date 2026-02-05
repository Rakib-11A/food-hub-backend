export declare const categoryService: {
    getCategories: () => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        slug: string | null;
        description: string | null;
        sortOrder: number | null;
        isActive: boolean;
    }[]>;
    createCategory: (data: {
        name: string;
        slug?: string;
        description?: string;
        image?: string;
        sortOrder?: number;
    }) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        slug: string | null;
        description: string | null;
        sortOrder: number | null;
        isActive: boolean;
    }>;
    updateCategory: (id: string, data: {
        name?: string;
        slug?: string;
        description?: string;
        image?: string;
        sortOrder?: number;
        isActive?: boolean;
    }) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        slug: string | null;
        description: string | null;
        sortOrder: number | null;
        isActive: boolean;
    }>;
    deleteCategory: (id: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        slug: string | null;
        description: string | null;
        sortOrder: number | null;
        isActive: boolean;
    }>;
};
//# sourceMappingURL=category.services.d.ts.map