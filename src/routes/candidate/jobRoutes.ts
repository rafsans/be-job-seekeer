import { Router } from "express";
import {
  getAllJobsHandler,
  getJobByIdHandler,
  saveJobHandler,
  unsaveJobHandler,
  getSavedJobsHandler,
  applyJobHandler,
  getApplicationsHandler,
} from "../../controller/candidate/jobController.js";
import { authenticate } from "../../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAllJobsHandler as any);
router.get("/detail/:id", getJobByIdHandler as any);
router.post("/save", authenticate, saveJobHandler as any);
router.delete("/save/:id", authenticate, unsaveJobHandler as any);
router.get("/saved", authenticate, getSavedJobsHandler as any);
router.post("/apply", authenticate, applyJobHandler as any);
router.get("/applications", authenticate, getApplicationsHandler as any);

export default router;
