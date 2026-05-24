import { Router } from "express";
import {
  getOnboardingHanlder,
  onboardingHandler,
  onboardingPersonalHandler,
  onboardingEducationHandler,
  onboardingExperienceHandler,
  onboardingSkillsCertsHandler,
  onboardingResumeHandler,
} from "../../controller/candidate/onboardingController.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { validate } from "../../middleware/validationMiddleware.js";
import {
  onboardingSchema,
  personalInfoSchema,
  educationStepSchema,
  experienceStepSchema,
  skillsCertsStepSchema,
  resumeStepSchema,
} from "../../validation/onboardingValidation.js";

const router = Router();

router.get("/", authenticate, getOnboardingHanlder as any);
router.post(
  "/",
  authenticate,
  validate(onboardingSchema),
  onboardingHandler as any,
);

router.post(
  "/personal",
  authenticate,
  validate(personalInfoSchema),
  onboardingPersonalHandler as any,
);

router.post(
  "/education",
  authenticate,
  validate(educationStepSchema),
  onboardingEducationHandler as any,
);

router.post(
  "/experience",
  authenticate,
  validate(experienceStepSchema),
  onboardingExperienceHandler as any,
);

router.post(
  "/skills-certs",
  authenticate,
  validate(skillsCertsStepSchema),
  onboardingSkillsCertsHandler as any,
);

router.post(
  "/resume",
  authenticate,
  validate(resumeStepSchema),
  onboardingResumeHandler as any,
);

export default router;

