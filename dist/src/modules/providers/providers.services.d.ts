export declare const providerService: {
    getProviders: () => Promise<({
        _count: {
            meals: number;
        };
    } & {
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
    })[]>;
    getProviderById: (id: string) => Promise<({
        user: {
            name: string;
            email: string;
        };
        meals: ({
            category: {
                name: string;
                id: string;
            } | null;
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
        })[];
    } & {
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
    }) | null>;
    createProviderProfile: (userId: string, data: {
        businessName: string;
        description?: string;
        address?: string;
        phone?: string;
        logo?: string;
    }) => Promise<{
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
    }>;
    updateProviderProfile: (userId: string, data: {
        businessName?: string;
        description?: string;
        address?: string;
        phone?: string;
        logo?: string;
        isActive?: boolean;
    }) => Promise<{
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
    }>;
};
//# sourceMappingURL=providers.services.d.ts.map