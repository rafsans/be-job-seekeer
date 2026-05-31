import { success, error } from "../../utils/response.js";
import prisma from "../../config/db.js";
import { updateResumeUrl, saveTopCategories } from "../../services/candidate/resumeServices.js";
import { uploadToS3 } from "../../utils/s3.js";
import { predictUrl, analyzeCvFile, analyzeCvUrl } from "../../services/ai/aiService.js";

export async function uploadResumeHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        if (!req.file) {
            return error(400, res, "No file uploaded");
        }
        // Upload directly to S3/Supabase Storage
        const resumeUrl = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype, "resumes");
        const result = await updateResumeUrl(userId, resumeUrl);

        // --- AI Prediction Logic ---
        let top3 = [];
        try {
            // Menggunakan predictUrl yang didownload oleh AI via Link S3
            const aiResult = await predictUrl(resumeUrl);
            if (aiResult && aiResult.top3_predictions) {
                top3 = aiResult.top3_predictions;
                await saveTopCategories(userId, top3);
            }
        } catch (aiErr) {
            console.error("Failed to get AI predictions:", aiErr.message);
            // We can still return success for resume upload, even if AI parsing failed
        }
        // ---------------------------

        return success(200, res, { resume_url: resumeUrl, top3_categories: top3 }, "Resume uploaded successfully");
    }
    catch (e) {
        console.error("Resume upload error:", e);
        return error(500, res, "Internal server error");
    }
}

export async function analyzeResumeHandler(req, res) {
    try {
        let fileBuffer, fileName;

        if (req.file) {
            const aiResult = await analyzeCvFile(req.file.buffer, req.file.originalname);
            return success(200, res, aiResult, "CV analyzed successfully");
        } else {
            const userId = req.user?.userId;
            if (!userId) return error(401, res, "Unauthorized");

            const user = await prisma.userDetails.findUnique({ where: { userId } });
            if (!user || !user.resumeUrl) {
                return error(400, res, "No resume found to analyze");
            }
            
            const aiResult = await analyzeCvUrl(user.resumeUrl);
            return success(200, res, aiResult, "CV analyzed successfully via URL");
        }
    }
    catch (e) {
        console.error("CV analyze error:", e);
        return error(500, res, e.message || "Internal server error during analysis");
    }
}
