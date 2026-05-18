import { Router } from "express";
import {
  getEducationsHandler,
  createEducationHandler,
  updateEducationHandler,
  deleteEducationHandler,
} from "../../controller/candidate/educationController.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { educationSchema } from "../../validation/educationValidation.js";

const router = Router();

router.get("/", authenticate, getEducationsHandler as any);
router.post("/", authenticate, validate(educationSchema), createEducationHandler as any);
router.put("/:id", authenticate, validate(educationSchema), updateEducationHandler as any);
router.delete("/:id", authenticate, deleteEducationHandler as any);

export default router;
