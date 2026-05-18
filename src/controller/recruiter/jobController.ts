import { Response } from "express";
import { success, error } from "../../utils/response.js";
import {
  getRecruiterJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobApplications,
  updateApplicationStatus,
  getAllRecruiterApplicants,
} from "../../services/recruiter/jobServices.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";

export async function getRecruiterJobsHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await getRecruiterJobs(userId);
    return success(200, res, result, "Jobs fetched successfully");
  } catch (e: any) {
    return error(500, res, e.message || "Internal server error");
  }
}

export async function createJobHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await createJob(userId, req.body);
    return success(201, res, result, "Job posted successfully");
  } catch (e: any) {
    return error(500, res, e.message || "Internal server error");
  }
}

export async function updateJobHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await updateJob(Number(id), userId, req.body);
    return success(200, res, result, "Job updated successfully");
  } catch (e: any) {
    return error(500, res, e.message || "Internal server error");
  }
}

export async function deleteJobHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    if (!userId) return error(401, res, "Unauthorized");

    await deleteJob(Number(id), userId);
    return success(200, res, null, "Job deleted successfully");
  } catch (e: any) {
    return error(500, res, e.message || "Internal server error");
  }
}

export async function getApplicationsHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    const { id } = req.params; // Job ID
    if (!userId) return error(401, res, "Unauthorized");

    const result = await getJobApplications(Number(id), userId);
    return success(200, res, result, "Applications fetched successfully");
  } catch (e: any) {
    return error(500, res, e.message || "Internal server error");
  }
}

export async function updateStatusHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    const { id } = req.params; // Application ID
    const { action, reason } = req.body;
    if (!userId) return error(401, res, "Unauthorized");

    const status = action === "accept" ? "HIRED" : "REJECTED";

    const result = await updateApplicationStatus(Number(id), status, userId, reason);
    return success(200, res, result, `Applicant ${action}ed successfully`);
  } catch (e: any) {
    return error(500, res, e.message || "Internal server error");
  }
}

export async function getRecruiterApplicantsHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await getAllRecruiterApplicants(userId, req.query);
    return success(200, res, result, "Applicants fetched successfully");
  } catch (e: any) {
    return error(500, res, e.message || "Internal server error");
  }
}
