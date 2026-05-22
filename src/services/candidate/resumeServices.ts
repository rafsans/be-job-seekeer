import prisma from "../../config/db.js";

export async function updateResumeUrl(userId: string, resumeUrl: string) {
  return prisma.userDetails.update({
    where: { userId },
    data: {
      resumeUrl: resumeUrl,
    },
  });
}
