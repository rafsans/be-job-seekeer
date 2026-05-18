import { Response } from "express";
import { success, error } from "../../utils/response.js";
import { updateResumeUrl } from "../../services/candidate/resumeServices.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";

export async function uploadResumeHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    if (!req.file) {
      return error(400, res, "No file uploaded");
    }

    // In a real app, you would upload this to Supabase/S3 and get a URL
    // For now, we'll just save the local path or a mock URL
    const resumeUrl = `/uploads/resumes/${req.file.filename}`;

    const result = await updateResumeUrl(userId, resumeUrl);
    return success(200, res, { resume_url: resumeUrl }, "Resume uploaded successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}
