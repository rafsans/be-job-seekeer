import { success, error } from "../../utils/response.js";
import { getAllJobs, getJobById, saveJob, unsaveJob, getSavedJobs, applyJob, getApplications, getRecommendedJobs } from "../../services/candidate/jobServices.js";
export async function getAllJobsHandler(req, res) {
    try {
        const result = await getAllJobs();
        return success(200, res, result, "Jobs fetched successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function getJobByIdHandler(req, res) {
    try {
        const { id } = req.params;
        const result = await getJobById(Number(id));
        if (!result)
            return error(404, res, "Job not found");
        return success(200, res, result, "Job fetched successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function saveJobHandler(req, res) {
    try {
        const userId = req.user?.userId;
        const { jobId } = req.body;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await saveJob(userId, jobId);
        return success(201, res, result, "Job saved successfully");
    }
    catch (e) {
        if (e.code === "P2002")
            return error(409, res, "Job already saved");
        return error(500, res, "Internal server error");
    }
}
export async function unsaveJobHandler(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if (!userId)
            return error(401, res, "Unauthorized");
        await unsaveJob(Number(id), userId);
        return success(200, res, null, "Job unsaved successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function getSavedJobsHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await getSavedJobs(userId);
        return success(200, res, result, "Saved jobs fetched successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function applyJobHandler(req, res) {
    try {
        const userId = req.user?.userId;
        const { jobId, coverLetter, resumeUrl } = req.body;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await applyJob(userId, jobId, { coverLetter, resumeUrl });
        return success(201, res, result, "Job application submitted successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function getApplicationsHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await getApplications(userId);
        return success(200, res, result, "Applications fetched successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}

export async function getRecommendedJobsHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await getRecommendedJobs(userId);
        return success(200, res, result, "Recommended jobs fetched successfully");
    }
    catch (e) {
        console.error("Error fetching recommended jobs:", e);
        return error(500, res, "Internal server error");
    }
}
