import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { adminService } from "./admin.services.js";

export const adminController = {
  getUsers: asyncHandler(async (_req: Request, res: Response) => {
    const users = await adminService.getUsers();
    res.status(200).json({ success: true, data: users });
  }),

  updateUserStatus: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { status } = req.body as { status: string };
    if (!status || !["ACTIVE", "SUSPENDED"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }
    const user = await adminService.updateUserStatus(id, status as "ACTIVE" | "SUSPENDED");
    res.status(200).json({
      success: true,
      data: {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    });
  }),

  getOrders: asyncHandler(async (_req: Request, res: Response) => {
    const orders = await adminService.getOrders();
    res.status(200).json({ success: true, data: orders });
  }),
};
