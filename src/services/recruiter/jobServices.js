import prisma from "../../config/db.js";
export async function getRecruiterJobs(userId) {
    const company = await prisma.companies.findUnique({
        where: { userId },
    });
    if (!company)
        throw new Error("Company profile not found");
    return prisma.jobs.findMany({
        where: { companyId: company.id },
        include: {
            _count: {
                select: { applications: true },
            },
            category: true,
            requirements: true,
            responsibilities: true,
            benefits: true,
        },
    });
}
export async function createJob(userId, data) {
    const company = await prisma.companies.findUnique({
        where: { userId },
    });
    if (!company)
        throw new Error("Company profile not found");
    return prisma.$transaction(async (tx) => {
        const job = await tx.jobs.create({
            data: {
                companyId: company.id,
                title: data.job_title,
                description: data.description,
                employmentType: data.employment_type,
                locationType: data.location_type,
                location: data.location,
                salaryMin: data.min_salary,
                salaryMax: data.max_salary,
                currency: data.currency,
                experienceLevel: data.experience_level,
                educationLevel: data.education_level,
                categoryId: data.category_id,
                deadLine: new Date(data.deadline),
            },
        });
        if (data.requirements && data.requirements.length > 0) {
            await tx.jobRequirements.createMany({
                data: data.requirements.map((item) => ({
                    jobId: job.id,
                    item,
                })),
            });
        }
        if (data.responsibilities && data.responsibilities.length > 0) {
            await tx.jobResponsibilities.createMany({
                data: data.responsibilities.map((item) => ({
                    jobId: job.id,
                    item,
                })),
            });
        }
        if (data.benefits && data.benefits.length > 0) {
            await tx.jobBenefits.createMany({
                data: data.benefits.map((item) => ({
                    jobId: job.id,
                    item,
                })),
            });
        }
        if (data.skills && data.skills.length > 0) {
            await tx.jobSkills.createMany({
                data: data.skills.map((skillId) => ({
                    jobId: job.id,
                    skillId,
                })),
            });
        }
        return tx.jobs.findUnique({
            where: { id: job.id },
            include: {
                requirements: true,
                responsibilities: true,
                benefits: true,
                jobSkills: { include: { skill: true } },
                category: true,
            },
        });
    });
}
export async function updateJob(jobId, userId, data) {
    const company = await prisma.companies.findUnique({
        where: { userId },
    });
    if (!company)
        throw new Error("Company profile not found");
    return prisma.$transaction(async (tx) => {
        const job = await tx.jobs.update({
            where: { id: jobId, companyId: company.id },
            data: {
                title: data.job_title,
                description: data.description,
                employmentType: data.employment_type,
                locationType: data.location_type,
                location: data.location,
                salaryMin: data.min_salary,
                salaryMax: data.max_salary,
                currency: data.currency,
                experienceLevel: data.experience_level,
                educationLevel: data.education_level,
                categoryId: data.category_id,
                deadLine: new Date(data.deadline),
            },
        });
        if (data.requirements !== undefined) {
            await tx.jobRequirements.deleteMany({ where: { jobId } });
            if (data.requirements.length > 0) {
                await tx.jobRequirements.createMany({
                    data: data.requirements.map((item) => ({ jobId, item })),
                });
            }
        }
        if (data.responsibilities !== undefined) {
            await tx.jobResponsibilities.deleteMany({ where: { jobId } });
            if (data.responsibilities.length > 0) {
                await tx.jobResponsibilities.createMany({
                    data: data.responsibilities.map((item) => ({ jobId, item })),
                });
            }
        }
        if (data.benefits !== undefined) {
            await tx.jobBenefits.deleteMany({ where: { jobId } });
            if (data.benefits.length > 0) {
                await tx.jobBenefits.createMany({
                    data: data.benefits.map((item) => ({ jobId, item })),
                });
            }
        }
        return tx.jobs.findUnique({
            where: { id: job.id },
            include: {
                requirements: true,
                responsibilities: true,
                benefits: true,
                jobSkills: { include: { skill: true } },
                category: true,
            },
        });
    });
}
export async function deleteJob(jobId, userId) {
    const company = await prisma.companies.findUnique({
        where: { userId },
    });
    if (!company)
        throw new Error("Company profile not found");
    return prisma.jobs.delete({
        where: { id: jobId, companyId: company.id },
    });
}
export async function getJobApplications(jobId, userId) {
    const company = await prisma.companies.findUnique({
        where: { userId },
    });
    if (!company)
        throw new Error("Company profile not found");
    const job = await prisma.jobs.findUnique({
        where: { id: jobId, companyId: company.id },
    });
    if (!job)
        throw new Error("Job not found or access denied");
    return prisma.applications.findMany({
        where: { jobId },
        include: {
            user: {
                include: {
                    userDetails: true,
                },
            },
        },
    });
}
export async function updateApplicationStatus(applicationId, status, userId, reason) {
    // Check if the recruiter owns the job for this application
    const application = await prisma.applications.findUnique({
        where: { id: applicationId },
        include: {
            job: {
                include: {
                    company: true,
                },
            },
        },
    });
    if (!application || application.job.company.userId !== userId) {
        throw new Error("Application not found or access denied");
    }
    return prisma.applications.update({
        where: { id: applicationId },
        data: {
            status,
            notes: reason || application.notes,
        },
    });
}
export async function getAllRecruiterApplicants(userId, filters) {
    const company = await prisma.companies.findUnique({
        where: { userId },
    });
    if (!company)
        throw new Error("Company profile not found");
    const { status, job_id, page = 1, limit = 10 } = filters;
    const skip = (Number(page) - 1) * Number(limit);
    const where = {
        job: {
            companyId: company.id,
        },
    };
    if (status) {
        where.status = status;
    }
    if (job_id) {
        where.jobId = Number(job_id);
    }
    const [applicants, total] = await Promise.all([
        prisma.applications.findMany({
            where,
            include: {
                user: {
                    include: {
                        userDetails: true,
                    },
                },
                job: {
                    include: {
                        category: true,
                    },
                },
            },
            skip,
            take: Number(limit),
            orderBy: { createdAt: "desc" },
        }),
        prisma.applications.count({ where }),
    ]);
    return {
        applicants,
        pagination: {
            currentPage: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            totalItems: total,
            itemsPerPage: Number(limit),
            hasNextPage: page * limit < total,
            hasPreviousPage: page > 1,
        },
    };
}
