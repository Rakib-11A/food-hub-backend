export declare const providerService: {
    getProviders(): Promise<({
        user: {
            name: string;
            email: string;
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
    getProviderById(id: string): Promise<({
        user: {
            name: string;
            email: string;
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
    }) | null>;
    createProviderProfile(userId: string, data: {
        businessName: string;
        description?: string;
        address?: string;
        phone?: string;
        logo?: string;
    }): Promise<{
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
    updateProviderProfile(userId: string, data: Record<string, unknown>): Promise<{
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