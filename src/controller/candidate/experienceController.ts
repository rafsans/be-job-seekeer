import { Response } from "express";
import { success, error } from "../../utils/response.js";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../services/candidate/experienceServices.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";

export async function getExperiencesHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await getExperiences(userId);
    return success(200, res, result, "Experiences fetched successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}

export async function createExperienceHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await createExperience(userId, req.body);
    return success(201, res, result, "Experience created successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}

export async function updateExperienceHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await updateExperience(Number(id), userId, req.body);
    return success(200, res, result, "Experience updated successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}

export async function deleteExperienceHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    if (!userId) return error(401, res, "Unauthorized");

    await deleteExperience(Number(id), userId);
    return success(200, res, null, "Experience deleted successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}
