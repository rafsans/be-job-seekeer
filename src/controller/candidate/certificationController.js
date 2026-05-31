import { success, error } from "../../utils/response.js";
import { getCertifications, createCertification, updateCertification, deleteCertification, } from "../../services/candidate/certificationServices.js";
export async function getCertificationsHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await getCertifications(userId);
        return success(200, res, result, "Certifications fetched successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function createCertificationHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await createCertification(userId, req.body);
        return success(201, res, result, "Certification created successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function updateCertificationHandler(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await updateCertification(Number(id), userId, req.body);
        return success(200, res, result, "Certification updated successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function deleteCertificationHandler(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if (!userId)
            return error(401, res, "Unauthorized");
        await deleteCertification(Number(id), userId);
        return success(200, res, null, "Certification deleted successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
