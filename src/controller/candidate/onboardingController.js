import { success, error } from "../../utils/response.js";
import { getOnboardingCandidate, onboardingCandidate, savePersonalInfo, saveEducationInfo, saveExperienceInfo, saveSkillsCertsInfo, saveResumeInfo, } from "../../services/candidate/onboardingServices.js";
export async function getOnboardingHanlder(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await getOnboardingCandidate(userId);
        return success(200, res, result, "Onboarding data retrieved successfully");
    }
    catch (e) {
        if (e.code === "CONFLICT")
            return error(409, res, e.message);
        return error(500, res, e.message);
    }
}
export async function onboardingHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        console.log(req.body);
        const result = await onboardingCandidate(userId, req.body);
        return success(201, res, result, "Onboarding completed successfully");
    }
    catch (e) {
        if (e.code === "CONFLICT")
            return error(409, res, e.message);
        return error(500, res, e.message);
    }
}
export async function onboardingPersonalHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await savePersonalInfo(userId, req.body);
        return success(200, res, result, "Personal information saved successfully");
    }
    catch (e) {
        return error(500, res, e.message);
    }
}
export async function onboardingEducationHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await saveEducationInfo(userId, req.body.education);
        return success(200, res, result, "Education saved successfully");
    }
    catch (e) {
        return error(500, res, e.message);
    }
}
export async function onboardingExperienceHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await saveExperienceInfo(userId, req.body.experience);
        return success(200, res, result, "Experience saved successfully");
    }
    catch (e) {
        return error(500, res, e.message);
    }
}
export async function onboardingSkillsCertsHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const { skills, certifications } = req.body;
        const result = await saveSkillsCertsInfo(userId, skills, certifications);
        return success(200, res, result, "Skills & certifications saved successfully");
    }
    catch (e) {
        return error(500, res, e.message);
    }
}
export async function onboardingResumeHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await saveResumeInfo(userId, req.body.resumeUrl);
        return success(200, res, result, "Resume url saved successfully");
    }
    catch (e) {
        return error(500, res, e.message);
    }
}
