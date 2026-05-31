import { success, error } from "../../utils/response.js";
import { getEducations, createEducation, updateEducation, deleteEducation, } from "../../services/candidate/educationServices.js";
export async function getEducationsHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await getEducations(userId);
        return success(200, res, result, "Educations fetched successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function createEducationHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await createEducation(userId, req.body);
        return success(201, res, result, "Education created successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function updateEducationHandler(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await updateEducation(Number(id), userId, req.body);
        return success(200, res, result, "Education updated successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function deleteEducationHandler(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if (!userId)
            return error(401, res, "Unauthorized");
        await deleteEducation(Number(id), userId);
        return success(200, res, null, "Education deleted successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
