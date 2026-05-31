import prisma from "../../config/db.js";
export async function getCandidateSkills(userId) {
    return prisma.userSkills.findMany({
        where: { userId },
        include: {
            skill: true,
        },
    });
}
export async function getCandidateSkillById(userId, skillId) {
    return prisma.userSkills.findUnique({
        where: { id: skillId, userId },
    });
}
export async function addSkillToCandidate(userId, skills) {
    const skillIds = [];
    for (const skillId of skills) {
        skillIds.push({
            userId,
            skillId,
        });
    }
    return prisma.userSkills.createMany({
        data: skillIds,
    });
}
export async function removeSkillFromCandidate(id, userId) {
    return prisma.userSkills.delete({
        where: { id, userId },
    });
}
export async function getAllSkills() {
    return prisma.skills.findMany();
}
