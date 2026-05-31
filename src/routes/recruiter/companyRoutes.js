import { Router } from "express";
import { onboardingHandler, getProfileHandler, updateProfileHandler, getOnboardingHandler, getPublicCompanyHandler, } from "../../controller/recruiter/companyController.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { companyOnboardingSchema } from "../../validation/recruiterValidation.js";
const router = Router();
router.get("/onboarding", authenticate, getOnboardingHandler);
router.post("/onboarding", authenticate, validate(companyOnboardingSchema), onboardingHandler);
router.get("/profile", authenticate, getProfileHandler);
router.put("/profile", authenticate, validate(companyOnboardingSchema), updateProfileHandler);
router.get("/company-information", authenticate, getProfileHandler);
router.put("/company-information", authenticate, validate(companyOnboardingSchema), updateProfileHandler);
// Public: view any company by ID
router.get("/company/:id", getPublicCompanyHandler);
export default router;
