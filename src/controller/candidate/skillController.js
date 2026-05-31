import { success, error } from "../../utils/response.js";
import { getCandidateSkills, addSkillToCandidate, removeSkillFromCandidate, getAllSkills, getCandidateSkillById, } from "../../services/candidate/skillServices.js";
export async function getCandidateSkillsHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const result = await getCandidateSkills(userId);
        const response = result.map((item) => ({
            id: item.id,
            name: item.skill.name,
        }));
        return success(200, res, response, "Skills fetched successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function addSkillHandler(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return error(401, res, "Unauthorized");
        const skills = req.body.skills;
        const data = [];
        for (const skill of skills) {
            const findSkill = await getCandidateSkillById(userId, skill);
            if (findSkill)
                return error(400, res, "Skill already added");
            data.push(skill);
        }
        const result = await addSkillToCandidate(userId, data);
        return success(201, res, result, "Skill added successfully");
    }
    catch (e) {
        if (e.code === "P2002")
            return error(409, res, "Skill already added");
        return error(500, res, "Internal server error");
    }
}
export async function removeSkillHandler(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if (!userId)
            return error(401, res, "Unauthorized");
        await removeSkillFromCandidate(Number(id), userId);
        return success(200, res, null, "Skill removed successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function getAllSkillsHandler(req, res) {
    try {
        const result = await getAllSkills();
        return success(200, res, result, "All skills fetched successfully");
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
