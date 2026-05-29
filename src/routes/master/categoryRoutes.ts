import express from "express";
import { getAllCategories } from "../../controller/master/categoryController.js";

const router = express.Router();

router.get("/", getAllCategories);

export default router;
