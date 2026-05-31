import { Router } from "express";
import { uploadResumeHandler, analyzeResumeHandler } from "../../controller/candidate/resumeController.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { upload } from "../../middleware/uploadMiddleware.js";
const router = Router();
router.put("/", authenticate, upload.single("resume"), uploadResumeHandler);
router.post("/analyze", authenticate, upload.single("resume"), analyzeResumeHandler);
export default router;
