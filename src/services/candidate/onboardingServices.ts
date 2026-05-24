import { Educations } from "./../../generated/prisma/index.js";
import prisma from "../../config/db.js";

export interface OnboardingData {
  personal: {
    firstname: string;
    lastname: string;
    phone: string;
    gender: string;
    address: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
    resume_url?: string;
  };
  education?: Array<{
    institution: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    grade: string | number;
    description: string;
  }>;
  experience?: Array<{
    company: string;
    position: string;
    employment_type: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERN";
    location_type: "REMOTE" | "HYBRID" | "ON_SITE";
    location: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    description: string;
  }>;
}

export async function getOnboardingCandidate(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      userDetails: true,
      educations: true,
      experiences: true,
    },
  });
}

export async function onboardingCandidate(
  userId: string,
  data: OnboardingData,
) {
  return prisma.$transaction(async (tx) => {
    const existingDetails = await tx.userDetails.findUnique({
      where: { userId },
    });

    if (existingDetails) {
      throw Object.assign(new Error("Onboarding already completed"), {
        code: "CONFLICT",
      });
    }

    const userDetails = await tx.userDetails.create({
      data: {
        userId,
        firstName: data.personal.firstname,
        lastName: data.personal.lastname,
        phone: data.personal.phone,
        gender: data.personal.gender,
        address: data.personal.address,
        city: data.personal.city,
        province: data.personal.province,
        country: data.personal.country,
        postalCode: data.personal.postalCode,
        resumeUrl: data.personal.resume_url ?? null
      },
    });

    if (data.education && data.education.length > 0) {
      await tx.educations.createMany({
        data: data.education.map((edu) => ({
          userId,
          institution: edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.field_of_study,
          startDate: new Date(edu.start_date),
          endDate: new Date(edu.end_date),
          isCurrent: edu.is_current,
          grade: String(edu.grade),
          description: edu.description,
        })),
      });
    }

    if (data.experience && data.experience.length > 0) {
      await tx.experiences.createMany({
        data: data.experience.map((exp) => ({
          userId,
          companyName: exp.company,
          position: exp.position,
          employmentType: exp.employment_type as any,
          locationType:
            exp.location_type === "ON_SITE"
              ? "ONSITE"
              : (exp.location_type as any),
          location: exp.location,
          startDate: new Date(exp.start_date),
          endDate: new Date(exp.end_date),
          isCurrent: exp.is_current,
          description: exp.description,
        })),
      });
    }

    return userDetails;
  });
}

export async function savePersonalInfo(userId: string, data: any) {
  const existingDetails = await prisma.userDetails.findUnique({
    where: { userId },
  });

  if (existingDetails) {
    return prisma.userDetails.update({
      where: { userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        gender: data.gender,
        address: data.address,
        city: data.city,
        province: data.province,
        country: data.country,
        postalCode: data.postalCode,
      },
    });
  }

  return prisma.userDetails.create({
    data: {
      userId,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      gender: data.gender,
      address: data.address,
      city: data.city,
      province: data.province,
      country: data.country,
      postalCode: data.postalCode,
    },
  });
}

export async function saveEducationInfo(userId: string, educations: any[]) {
  return prisma.$transaction(async (tx) => {
    // Clear existing educations
    await tx.educations.deleteMany({ where: { userId } });

    // Create new ones
    if (educations.length > 0) {
      await tx.educations.createMany({
        data: educations.map((edu) => ({
          userId,
          institution: edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          startDate: new Date(edu.startDate),
          endDate: edu.endDate ? new Date(edu.endDate) : new Date(edu.startDate),
          isCurrent: edu.isCurrent || false,
          grade: String(edu.grade || ""),
          description: edu.description || "",
        })),
      });
    }

    return tx.educations.findMany({ where: { userId } });
  });
}

export async function saveExperienceInfo(userId: string, experiences: any[]) {
  return prisma.$transaction(async (tx) => {
    // Clear existing experiences
    await tx.experiences.deleteMany({ where: { userId } });

    // Create new ones
    if (experiences && experiences.length > 0) {
      await tx.experiences.createMany({
        data: experiences.map((exp) => ({
          userId,
          companyName: exp.companyName,
          position: exp.position,
          employmentType: exp.employmentType,
          location: exp.location,
          locationType: exp.locationType,
          startDate: new Date(exp.startDate),
          endDate: exp.endDate ? new Date(exp.endDate) : new Date(exp.startDate),
          isCurrent: exp.isCurrent || false,
          description: exp.description || "",
        })),
      });
    }

    return tx.experiences.findMany({ where: { userId } });
  });
}

export async function saveSkillsCertsInfo(
  userId: string,
  skills: string[],
  certifications: any[]
) {
  return prisma.$transaction(async (tx) => {
    // Clear and update skills
    if (skills) {
      await tx.userSkills.deleteMany({ where: { userId } });
      for (const skillName of skills) {
        let skill = await tx.skills.findFirst({
          where: { name: { equals: skillName, mode: "insensitive" } },
        });
        if (!skill) {
          skill = await tx.skills.create({
            data: { name: skillName },
          });
        }
        await tx.userSkills.create({
          data: {
            userId,
            skillId: skill.id,
          },
        });
      }
    }

    // Clear and update certifications
    if (certifications) {
      await tx.certifications.deleteMany({ where: { userId } });
      if (certifications.length > 0) {
        await tx.certifications.createMany({
          data: certifications.map((cert) => ({
            userId,
            name: cert.name,
            issuingOrganization: cert.issuingOrganization,
            issueDate: new Date(cert.issueDate),
            expiryDate: cert.expiryDate ? new Date(cert.expiryDate) : new Date(cert.issueDate),
            credentialId: cert.credentialId || null,
            credentialUrl: cert.credentialUrl || null,
            description: cert.description || "",
          })),
        });
      }
    }

    const savedSkills = await tx.userSkills.findMany({
      where: { userId },
      include: { skill: true },
    });
    const savedCerts = await tx.certifications.findMany({
      where: { userId },
    });

    return {
      skills: savedSkills.map((s) => s.skill.name),
      certifications: savedCerts,
    };
  });
}

export async function saveResumeInfo(userId: string, resumeUrl: string) {
  return prisma.userDetails.update({
    where: { userId },
    data: {
      resumeUrl: resumeUrl || null,
    },
  });
}
