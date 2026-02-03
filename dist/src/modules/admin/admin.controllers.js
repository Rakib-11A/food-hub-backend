import { asyncHandler } from "../../utils/asyncHandler";
import { adminService } from "./admin.services";
const getUsers = asyncHandler(async (req, res) => {
    const result = await adminService.getAllUsers();
    res.status(200).json({ success: true, message: "Users fetched", data: result });
});
const updateUserStatus = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    if (!status)
        return res.status(400).json({ success: false, message: "status required" });
    if (status !== "ACTIVE" && status !== "SUSPENDED") {
        return res.status(400).json({ success: false, message: "status must be ACTIVE or SUSPENDED" });
    }
    const result = await adminService.updateUserStatus(id, status);
    res.status(200).json({ success: true, message: "User status updated", data: result });
});
const getOrders = asyncHandler(async (req, res) => {
    const result = await adminService.getAllOrders();
    res.status(200).json({ success: true, message: "Orders fetched", data: result });
});
export const adminController = {
    getUsers,
    updateUserStatus,
    getOrders,
};
//# sourceMappingURL=admin.controllers.js.map