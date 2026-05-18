import { Router } from "express";
import {
  getExperiencesHandler,
  createExperienceHandler,
  updateExperienceHandler,
  deleteExperienceHandler,
} from "../../controller/candidate/experienceController.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { experienceSchema } from "../../validation/experienceValidation.js";

const router = Router();

router.get("/", authenticate, getExperiencesHandler as any);
router.post("/", authenticate, validate(experienceSchema), createExperienceHandler as any);
router.put("/:id", authenticate, validate(experienceSchema), updateExperienceHandler as any);
router.delete("/:id", authenticate, deleteExperienceHandler as any);

export default router;
