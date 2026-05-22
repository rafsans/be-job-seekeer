import { Router } from "express";
import {
  onboardingHandler,
  getProfileHandler,
  updateProfileHandler,
  getOnboardingHandler
} from "../../controller/recruiter/companyController.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { companyOnboardingSchema } from "../../validation/recruiterValidation.js";

const router = Router();

router.get("/onboarding", authenticate, getOnboardingHandler as any);
router.post("/onboarding", authenticate, validate(companyOnboardingSchema), onboardingHandler as any);
router.get("/profile", authenticate, getProfileHandler as any);
router.put("/profile", authenticate, validate(companyOnboardingSchema), updateProfileHandler as any);

router.get("/company-information", authenticate, getProfileHandler as any);
router.put("/company-information", authenticate, validate(companyOnboardingSchema), updateProfileHandler as any);

export default router;
