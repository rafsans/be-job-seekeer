import { Router } from "express";
import { getProfileHandler, updateProfileHandler, } from "../../controller/candidate/profileController.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { updateProfileSchema } from "../../validation/profileValidation.js";
const router = Router();
router.get("/me", authenticate, getProfileHandler);
router.put("/", authenticate, validate(updateProfileSchema), updateProfileHandler);
export default router;
