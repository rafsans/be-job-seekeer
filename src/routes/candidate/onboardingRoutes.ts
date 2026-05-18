import { Router } from "express";
import { onboardingHandler } from "../../controller/candidate/onboardingController.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { onboardingSchema } from "../../validation/onboardingValidation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(onboardingSchema),
  onboardingHandler as any
);

export default router;
