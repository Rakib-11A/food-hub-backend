import { asyncHandler } from "../../utils/asyncHandler";
import { categoryService } from "./category.services";
const getCategories = asyncHandler(async (req, res) => {
    const result = await categoryService.getCategories();
    res.status(200).json({
        success: true,
        message: "All Category fetch",
        data: result,
    });
});
const createCategory = asyncHandler(async (req, res) => {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json({
        success: false,
        message: "Category created",
        data: result
    });
});
const updateCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await categoryService.updateCategory(id, req.body);
    res.status(200).json({
        success: true,
        message: "Category updated",
        data: result
    });
});
const deleteCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await categoryService.deleteCategory(id);
    res.status(200).json({
        success: true,
        message: "Category deleted",
        data: result
    });
});
export const categoryController = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
//# sourceMappingURL=category.controllers.js.map