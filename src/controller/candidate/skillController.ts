import { Response, Request } from "express";
import { success, error } from "../../utils/response.js";
import {
  getCandidateSkills,
  addSkillToCandidate,
  removeSkillFromCandidate,
  getAllSkills,
  getCandidateSkillById,
} from "../../services/candidate/skillServices.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";

export async function getCandidateSkillsHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const result = await getCandidateSkills(userId);
    const response = result.map((item) => ({
      id: item.id,
      name: item.skill.name,
    }));
    return success(200, res, response, "Skills fetched successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}

export async function addSkillHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) return error(401, res, "Unauthorized");

    const skills = req.body.skills;

    const data = []
    for (const skill of skills) {
      const findSkill = await getCandidateSkillById(userId, skill)
      if (findSkill) return error(400, res, "Skill already added");
      data.push(
        skill,
      )
    }
    const result = await addSkillToCandidate(userId, data);
    return success(201, res, result, "Skill added successfully");
  } catch (e: any) {
    if (e.code === "P2002") return error(409, res, "Skill already added");
    return error(500, res, "Internal server error");
  }
}

export async function removeSkillHandler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    if (!userId) return error(401, res, "Unauthorized");

    await removeSkillFromCandidate(Number(id), userId);
    return success(200, res, null, "Skill removed successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}

export async function getAllSkillsHandler(req: Request, res: Response) {
  try {
    const result = await getAllSkills();
    return success(200, res, result, "All skills fetched successfully");
  } catch (e: any) {
    return error(500, res, "Internal server error");
  }
}
