import prisma from "../../config/db.js";

export async function getCandidateSkills(userId: string) {
  return await prisma.userSkills.findMany({
    where: { userId },
    include: {
      skill: true,
    },
  });
}

export async function addSkillToCandidate(userId: string, skillId: number) {
  return await prisma.userSkills.create({
    data: {
      userId,
      skillId,
    },
    include: {
      skill: true,
    },
  });
}

export async function removeSkillFromCandidate(id: number, userId: string) {
  return await prisma.userSkills.delete({
    where: { id, userId },
  });
}

export async function getAllSkills() {
  return await prisma.skills.findMany();
}
