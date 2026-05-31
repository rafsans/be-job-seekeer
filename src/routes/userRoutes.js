import { Router } from "express";
import { getAll, create } from "../controller/user/userController.js";
const router = Router();
router.get("/", getAll);
// router.get("/:id", getById);
router.post("/", create);
export default router;
