import { success, error } from "../../utils/response.js";
import { getExperiences, createExperience, updateExperience, deleteExperience, } from "../../services/candidate/experienceServices.js";
export async function getExperiencesHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await getExperiences(userId);
        return success(200, res, result, "Experiences fetched successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function createExperienceHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await createExperience(userId, req.body);
        return success(201, res, result, "Experience created successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function updateExperienceHandler(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await updateExperience(Number(id), userId, req.body);
        return success(200, res, result, "Experience updated successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function deleteExperienceHandler(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if (!userId)
            return error(401, res, "Unauthorized");
        await deleteExperience(Number(id), userId);
        return success(200, res, null, "Experience deleted successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
