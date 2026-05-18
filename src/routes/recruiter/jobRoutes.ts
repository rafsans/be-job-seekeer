import { Router } from "express";
import {
  getRecruiterJobsHandler,
  createJobHandler,
  updateJobHandler,
  deleteJobHandler,
  getApplicationsHandler,
  updateStatusHandler,
} from "../../controller/recruiter/jobController.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { postJobSchema, acceptRejectSchema } from "../../validation/recruiterValidation.js";

const router = Router();

router.get("/", authenticate, getRecruiterJobsHandler as any);
router.post("/", authenticate, validate(postJobSchema), createJobHandler as any);
router.put("/:id", authenticate, validate(postJobSchema), updateJobHandler as any);
router.delete("/:id", authenticate, deleteJobHandler as any);

router.get("/:id/applications", authenticate, getApplicationsHandler as any);
router.patch("/:id/status", authenticate, validate(acceptRejectSchema), updateStatusHandler as any);

export default router;
