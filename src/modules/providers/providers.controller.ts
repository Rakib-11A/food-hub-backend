import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { prisma } from "../../lib/prisma.js";
import { providerService } from "./providers.services.js";
import { success } from "better-auth";

const getProviders = asyncHandler(async (req: Request, res: Response) => {
    const result = await providerService.getProviders();
    res.status(200).json({
        success: true,
        message: "Providers fetched",
        data: result
    })
});

const getProviderById = asyncHandler(async(req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await providerService.getProviderById(id);
    if (!result) {
        return res.status(404).json({ success: false, message: "Provider not found" });
    }
    res.status(200).json({
        success: true,
        message: "Provider fetched",
        data: result,
    })
});

const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized!" });
    }
    const profile = await prisma.providerProfile.findUnique({
        where: { userId: user.id },
        include: { user: { select: { name: true, email: true } } },
    });
    if (!profile) {
        return res.status(404).json({
            success: false,
            message: "Provider profile not found. Create a provider profile first.",
        });
    }
    res.status(200).json({
        success: true,
        message: "Provider profile fetched",
        data: profile,
    });
});

const createProviderProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    console.log("User pawa gase : ", user);
    if(!user){
        return res.status(401).json({
            success: false,
            message: "Unauthorized!",
        })
    }

    const { businessName, description, address, phone, logo } = req.body;
    
    if (!businessName) {
        return res.status(400).json({
            success: false,
            message: "Business name is required!",
        });
    }

    const existingProfile = await prisma.providerProfile.findUnique({
        where: {
            userId: user.id
        }
    });

    if(existingProfile){
        return res.status(400).json({
            success: false,
            message: "Provider Profile already exits",
        })
    }
    const result = await providerService.createProviderProfile(user.id, {
        businessName,
        description,
        address,
        phone,
        logo
    });
    res.status(201).json({
        success: true,
        message: "Provider profile created",
        data: result,
    });

})

const updateProviderProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if(!user){
        return res.status(401).json({
            success: false,
            message: "Unauthorized!",
        });
    }
    const result = await providerService.updateProviderProfile(user.id, req.body);
    res.status(200).json({
        success: true,
        message: "Provider profile updated",
        data: result
    })
})
export const providerController = {
    getProviders,
    getProviderById,
    getMyProfile,
    createProviderProfile,
    updateProviderProfile,
};