import { Response } from "express";
import { success, error } from "../../utils/response.js";
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../../services/candidate/certificationServices.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";

export async function getCertificationsHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await getCertifications(userId);
    return success(200, res, result, "Certifications fetched successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}

export async function createCertificationHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await createCertification(userId, req.body);
    return success(201, res, result, "Certification created successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}

export async function updateCertificationHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await updateCertification(Number(id), userId, req.body);
    return success(200, res, result, "Certification updated successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}

export async function deleteCertificationHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    if (!userId) return error(401, res, "Unauthorized");

    await deleteCertification(Number(id), userId);
    return success(200, res, null, "Certification deleted successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}
