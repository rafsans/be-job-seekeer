import prisma from "../../config/db.js";

export async function getCandidateSkills(userId: string) {
  return prisma.userSkills.findMany({
    where: { userId },
    include: {
      skill: true,
    },
  });
}

export async function getCandidateSkillById(userId: string, skillId: number) {
  return prisma.userSkills.findUnique({
    where: { id: skillId, userId },
  });
}

export async function addSkillToCandidate(userId: string, skills: number[]) {
  const skillIds: { userId: string; skillId: number }[] = [];

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

export async function removeSkillFromCandidate(id: number, userId: string) {
  return prisma.userSkills.delete({
    where: { id, userId },
  });
}

export async function getAllSkills() {
  return prisma.skills.findMany();
}
