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
            benefits: true,
        },
    });
}
export async function getJobById(id) {
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
            benefits: true,
        },
    });
}
export async function saveJob(userId, jobId) {
    return prisma.savedJobs.create({
        data: {
            userId,
            jobId,
        },
    });
}
export async function unsaveJob(id, userId) {
    return prisma.savedJobs.delete({
        where: { id, userId },
    });
}
export async function getSavedJobs(userId) {
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
export async function applyJob(userId, jobId, data) {
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
export async function getApplications(userId) {
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

export async function getRecommendedJobs(userId) {
    const userCategories = await prisma.userTopCategories.findUnique({
        where: { userId },
    });

    if (!userCategories) return [];

    const categories = [userCategories.category1, userCategories.category2, userCategories.category3].filter(Boolean);

    if (categories.length === 0) return [];

    return prisma.jobs.findMany({
        where: {
            isActive: true,
            category: {
                OR: [
                    { name: { in: categories } },
                    { title: { in: categories } }
                ]
            }
        },
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
            benefits: true,
        },
    });
}
