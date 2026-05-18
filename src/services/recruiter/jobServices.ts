import prisma from "../../config/db.js";

export async function getRecruiterJobs(userId: string) {
  const company = await prisma.companies.findUnique({
    where: { userId },
  });

  if (!company) throw new Error("Company profile not found");

  return await prisma.jobs.findMany({
    where: { companyId: company.id },
    include: {
      _count: {
        select: { applications: true },
      },
    },
  });
}

export async function createJob(userId: string, data: any) {
  const company = await prisma.companies.findUnique({
    where: { userId },
  });

  if (!company) throw new Error("Company profile not found");

  return await prisma.$transaction(async (tx) => {
    const job = await tx.jobs.create({
      data: {
        companyId: company.id,
        title: data.job_title,
        description: data.description,
        requirements: data.requirements,
        responsibilities: data.responsibilities,
        benefits: data.benefits,
        employmentType: data.employment_type,
        locationType: data.location_type,
        location: data.location,
        salaryMin: data.min_salary,
        salaryMax: data.max_salary,
        currency: data.currency,
        experienceLevel: data.experience_level,
        educationLevel: data.education_level,
        deadLine: new Date(data.deadline),
      },
    });

    if (data.skills && data.skills.length > 0) {
      await tx.jobSkills.createMany({
        data: data.skills.map((skillId: number) => ({
          jobId: job.id,
          skillId,
        })),
      });
    }

    return job;
  });
}

export async function updateJob(jobId: number, userId: string, data: any) {
  const company = await prisma.companies.findUnique({
    where: { userId },
  });

  if (!company) throw new Error("Company profile not found");

  return await prisma.jobs.update({
    where: { id: jobId, companyId: company.id },
    data: {
      title: data.job_title,
      description: data.description,
      requirements: data.requirements,
      responsibilities: data.responsibilities,
      benefits: data.benefits,
      employmentType: data.employment_type,
      locationType: data.location_type,
      location: data.location,
      salaryMin: data.min_salary,
      salaryMax: data.max_salary,
      currency: data.currency,
      experienceLevel: data.experience_level,
      educationLevel: data.education_level,
      deadLine: new Date(data.deadline),
    },
  });
}

export async function deleteJob(jobId: number, userId: string) {
  const company = await prisma.companies.findUnique({
    where: { userId },
  });

  if (!company) throw new Error("Company profile not found");

  return await prisma.jobs.delete({
    where: { id: jobId, companyId: company.id },
  });
}

export async function getJobApplications(jobId: number, userId: string) {
  const company = await prisma.companies.findUnique({
    where: { userId },
  });

  if (!company) throw new Error("Company profile not found");

  const job = await prisma.jobs.findUnique({
    where: { id: jobId, companyId: company.id },
  });

  if (!job) throw new Error("Job not found or access denied");

  return await prisma.applications.findMany({
    where: { jobId },
    include: {
      user: {
        include: {
          user_details: true,
        },
      },
    },
  });
}

export async function updateApplicationStatus(applicationId: number, status: any, userId: string, reason?: string) {
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

  return await prisma.applications.update({
    where: { id: applicationId },
    data: {
      status,
      notes: reason || application.notes,
    },
  });
}

export async function getAllRecruiterApplicants(userId: string, filters: any) {
  const company = await prisma.companies.findUnique({
    where: { userId },
  });

  if (!company) throw new Error("Company profile not found");

  const { status, job_id, page = 1, limit = 10 } = filters;
  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {
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
            user_details: true,
          },
        },
        job: true,
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
