import prisma from "../../config/db.js";

export async function getAllJobs() {
  return prisma.jobs.findMany({
    where: { isActive: true },
    include: {
      jobSkills: {
        include: {
          skill: true,
        },
      },
      company: true,
      category: true,
      requirements: true,
      responsibilities: true,
    },
  });
}

export async function getJobById(id: number) {
  return prisma.jobs.findUnique({
    where: { id },
    include: {
      jobSkills: {
        include: {
          skill: true,
        },
      },
      company: true,
      category: true,
      requirements: true,
      responsibilities: true,
    },
  });
}

export async function saveJob(userId: string, jobId: number) {
  return prisma.savedJobs.create({
    data: {
      userId,
      jobId,
    },
  });
}

export async function unsaveJob(id: number, userId: string) {
  return prisma.savedJobs.delete({
    where: { id, userId },
  });
}

export async function getSavedJobs(userId: string) {
  return prisma.savedJobs.findMany({
    where: { userId },
    include: {
      job: {
        include: {
          company: true,
          category: true,
        },
      },
    },
  });
}

export async function applyJob(userId: string, jobId: number, data: { coverLetter: string, resumeUrl: string }) {
  return prisma.applications.create({
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
  return prisma.applications.findMany({
    where: { userId },
    include: {
      job: {
        include: {
          company: true,
          category: true,
        },
      },
    },
  });
}
