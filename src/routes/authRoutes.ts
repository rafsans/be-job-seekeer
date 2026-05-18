import { Router } from "express";
import {
  registerHandler,
  loginHandler,
  changeEmailHandler,
  changePasswordHandler,
} from "../controller/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import {
  registerSchema,
  loginSchema,
  changeEmailSchema,
  changePasswordSchema,
} from "../validation/authValidation.js";

const router = Router();

router.post("/register", validate(registerSchema), registerHandler);
router.post("/login", validate(loginSchema), loginHandler);
router.post(
  "/change-email",
  authenticate,
  validate(changeEmailSchema),
  changeEmailHandler as any,
);
router.post(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  changePasswordHandler as any,
);

export default router;
