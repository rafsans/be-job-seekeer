import { Response } from "express";
import { success, error } from "../../utils/response.js";
import {
  createCompany,
  getCompanyByUserId,
  updateCompany,
} from "../../services/recruiter/companyServices.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";

export async function getOnboardingHandler(req: AuthRequest, res: Response){
  try{
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await getCompanyByUserId(userId);
    if (!result) return error(404, res, "Company profile not found");
    return success(200, res, result, "Company profile fetched successfully");
  }catch(e: any){
    return error(500, res, "Internal server error");
  }
}

export async function onboardingHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await createCompany(userId, req.body);
    return success(201, res, result, "Company onboarding completed successfully");
  } catch (e: any) {
    if (e.code === "P2002") return error(409, res, "Company profile already exists");
    return error(500, res, "Internal server error");
  }
}

export async function getProfileHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await getCompanyByUserId(userId);
    if (!result) return error(404, res, "Company profile not found");
    return success(200, res, result, "Company profile fetched successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}

export async function updateProfileHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await updateCompany(userId, req.body);
    return success(200, res, result, "Company profile updated successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}
