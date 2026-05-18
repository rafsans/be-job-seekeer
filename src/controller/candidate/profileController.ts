import { Response } from "express";
import { success, error } from "../../utils/response.js";
import {
  getCandidateProfile,
  updateCandidateProfile,
} from "../../services/candidate/profileServices.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";

export async function getProfileHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await getCandidateProfile(userId);
    return success(200, res, result, "Profile fetched successfully");
  } catch (e: any) {
    if (e.code === "NOT_FOUND") return error(404, res, e.message);
    return error(500, res, "Internal server error");
  }
}

export async function updateProfileHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await updateCandidateProfile(userId, req.body);
    return success(200, res, result, "Profile updated successfully");
  } catch (e: any) {
    if (e.code === "NOT_FOUND") return error(404, res, e.message);
    return error(500, res, "Internal server error");
  }
}
