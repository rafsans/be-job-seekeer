import { Response, Request } from "express";
import { success, error } from "../../utils/response.js";
import {
  getAllJobs,
  getJobById,
  saveJob,
  unsaveJob,
  getSavedJobs,
  applyJob,
  getApplications,
} from "../../services/candidate/jobServices.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";

export async function getAllJobsHandler(req: Request, res: Response) {
  try {
    const result = await getAllJobs();
    return success(200, res, result, "Jobs fetched successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}

export async function getJobByIdHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await getJobById(Number(id));
    if (!result) return error(404, res, "Job not found");
    return success(200, res, result, "Job fetched successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}

export async function saveJobHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    const { jobId } = req.body;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await saveJob(userId, jobId);
    return success(201, res, result, "Job saved successfully");
  } catch (e: any) {
    if (e.code === "P2002") return error(409, res, "Job already saved");
    return error(500, res, "Internal server error");
  }
}

export async function unsaveJobHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    if (!userId) return error(401, res, "Unauthorized");

    await unsaveJob(Number(id), userId);
    return success(200, res, null, "Job unsaved successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}

export async function getSavedJobsHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await getSavedJobs(userId);
    return success(200, res, result, "Saved jobs fetched successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}

export async function applyJobHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    const { jobId, coverLetter, resumeUrl } = req.body;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await applyJob(userId, jobId, { coverLetter, resumeUrl });
    return success(201, res, result, "Job application submitted successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}

export async function getApplicationsHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await getApplications(userId);
    return success(200, res, result, "Applications fetched successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}
