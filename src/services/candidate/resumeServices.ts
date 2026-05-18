import prisma from "../../config/db.js";

export async function updateResumeUrl(userId: string, resumeUrl: string) {
  return await prisma.userDetails.update({
    where: { userId },
    data: {
      resumeUrl: resumeUrl,
    },
  });
}
