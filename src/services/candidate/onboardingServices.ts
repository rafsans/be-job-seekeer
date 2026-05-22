import { Educations } from "./../../generated/prisma/index.js";
import prisma from "../../config/db.js";

export interface OnboardingData {
  personal: {
    firstname: string;
    lastname: string;
    phone: string;
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
        address: data.personal.address,
        city: data.personal.city,
        province: data.personal.province,
        country: data.personal.country,
        postalCode: data.personal.postalCode,
        resumeUrl: data.personal.resume_url ?? null,
        bio: "",
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
