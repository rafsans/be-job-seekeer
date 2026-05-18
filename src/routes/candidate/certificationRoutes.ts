import { Router } from "express";
import {
  getCertificationsHandler,
  createCertificationHandler,
  updateCertificationHandler,
  deleteCertificationHandler,
} from "../../controller/candidate/certificationController.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { certificationSchema } from "../../validation/certificationValidation.js";

const router = Router();

router.get("/", authenticate, getCertificationsHandler as any);
router.post("/", authenticate, validate(certificationSchema), createCertificationHandler as any);
router.put("/:id", authenticate, validate(certificationSchema), updateCertificationHandler as any);
router.delete("/:id", authenticate, deleteCertificationHandler as any);

export default router;
