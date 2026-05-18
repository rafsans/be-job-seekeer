import { Router } from "express";
import {
  getCandidateSkillsHandler,
  addSkillHandler,
  removeSkillHandler,
  getAllSkillsHandler,
} from "../../controller/candidate/skillController.js";
import { authenticate } from "../../middleware/authMiddleware.js";

const router = Router();

router.get("/", authenticate, getCandidateSkillsHandler as any);
router.post("/", authenticate, addSkillHandler as any);
router.delete("/:id", authenticate, removeSkillHandler as any);
router.get("/master", getAllSkillsHandler as any);

export default router;
