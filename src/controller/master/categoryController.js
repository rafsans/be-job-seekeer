import prisma from "../../config/db.js";
export const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.jobCategory.findMany({
            orderBy: { name: "asc" },
        });
        res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: categories,
        });
    }
    catch (error) {
        console.error("Error in getAllCategories:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
