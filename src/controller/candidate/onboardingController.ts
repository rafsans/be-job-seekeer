import { Response } from "express";
import { success, error } from "../../utils/response.js";
import { onboardingCandidate } from "../../services/candidate/onboardingServices.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";

export async function onboardingHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await onboardingCandidate(userId, req.body);
    return success(201, res, result, "Onboarding completed successfully");
  } catch (e: any) {
    if (e.code === "CONFLICT") return error(409, res, e.message);
    return error(500, res, "Internal server error");
  }
}
