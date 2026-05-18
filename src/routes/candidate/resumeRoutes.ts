import { Router } from "express";
import { uploadResumeHandler } from "../../controller/candidate/resumeController.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { upload } from "../../middleware/uploadMiddleware.js";

const router = Router();

router.put("/", authenticate, upload.single("resume"), uploadResumeHandler as any);

export default router;
