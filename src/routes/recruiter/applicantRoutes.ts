import { Router } from "express";
import { getRecruiterApplicantsHandler } from "../../controller/recruiter/jobController.js";
import { authenticate } from "../../middleware/authMiddleware.js";

const router = Router();

router.get("/", authenticate, getRecruiterApplicantsHandler as any);

export default router;
