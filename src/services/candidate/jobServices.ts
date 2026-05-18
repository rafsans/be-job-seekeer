import prisma from "../../config/db.js";

export async function getAllJobs() {
  return await prisma.jobs.findMany({
    where: { isActive: true },
    include: {
      jobSkills: {
        include: {
          skill: true,
        },
      },
    },
  });
}

export async function getJobById(id: number) {
  return await prisma.jobs.findUnique({
    where: { id },
    include: {
      jobSkills: {
        include: {
          skill: true,
        },
      },
      company: true,
    },

  });
}

export async function saveJob(userId: string, jobId: number) {
  return await prisma.savedJobs.create({
    data: {
      userId,
      jobId,
    },
  });
}

export async function unsaveJob(id: number, userId: string) {
  return await prisma.savedJobs.delete({
    where: { id, userId },
  });
}

export async function getSavedJobs(userId: string) {
  return await prisma.savedJobs.findMany({
    where: { userId },
    include: {
      job: true,
    },
  });
}

export async function applyJob(userId: string, jobId: number, data: { coverLetter: string, resumeUrl: string }) {
  return await prisma.applications.create({
    data: {
      userId,
      jobId,
      status: "APPLIED",
      coverLetter: data.coverLetter,
      resumeUrl: data.resumeUrl,
      notes: "",
    },
  });
}

export async function getApplications(userId: string) {
  return await prisma.applications.findMany({
    where: { userId },
    include: {
      job: true,
    },
  });
}
