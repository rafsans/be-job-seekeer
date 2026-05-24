import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

export const educationStepSchema = z.object({
  education: z.array(
    z.object({
      institution: z.string().min(1, "Institution is required"),
      degree: z.string().min(1, "Degree is required"),
      fieldOfStudy: z.string().min(1, "Field of study is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().optional().nullable().or(z.literal("")),
      isCurrent: z.boolean().default(false),
      grade: z.union([z.string(), z.number()]).optional().nullable(),
      description: z.string().optional().nullable(),
    })
  ).min(1, "At least one education is required"),
});

export const experienceStepSchema = z.object({
  experience: z.array(
    z.object({
      companyName: z.string().min(1, "Company name is required"),
      position: z.string().min(1, "Position is required"),
      employmentType: z.string().min(1, "Employment type is required"),
      location: z.string().min(1, "Location is required"),
      locationType: z.string().min(1, "Location type is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().optional().nullable().or(z.literal("")),
      isCurrent: z.boolean().default(false),
      description: z.string().optional().nullable(),
      achievement: z.string().optional().nullable(),
    })
  ).optional().nullable(),
});

export const skillsCertsStepSchema = z.object({
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  certifications: z.array(
    z.object({
      name: z.string().min(1, "Certification name is required"),
      issuingOrganization: z.string().min(1, "Issuing organization is required"),
      issueDate: z.string().min(1, "Issue date is required"),
      expiryDate: z.string().optional().nullable().or(z.literal("")),
      credentialId: z.string().optional().nullable(),
      credentialUrl: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
    })
  ).optional().nullable(),
});

export const resumeStepSchema = z.object({
  resumeUrl: z.string().url("Invalid resume URL").optional().nullable(),
});

// Legacy schema for compatibility
export const onboardingSchema = z.object({
  personal: z.object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone is required"),
    gender: z.string().min(1, "Gender is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    province: z.string().min(1, "Province is required"),
    country: z.string().min(1, "Country is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    resume_url: z.string().url().optional(),
  }),
  education: z
    .array(
      z.object({
        institution: z.string().min(1, "Institution is required"),
        degree: z.string().min(1, "Degree is required"),
        field_of_study: z.string().min(1, "Field of study is required"),
        start_date: z.string().min(1, "Start date is required"),
        end_date: z.string().min(1, "End date is required"),
        is_current: z.boolean(),
        grade: z.union([z.string(), z.number()]),
        description: z.string().min(1, "Description is required"),
      }),
    )
    .min(1, "At least one education is required"),
  experiences: z
    .array(
      z.object({
        company: z.string().min(1, "Company is required"),
        position: z.string().min(1, "Position is required"),
        employment_type: z.enum([
          "FULL_TIME",
          "PART_TIME",
          "CONTRACT",
          "INTERN",
        ]),
        location_type: z.enum(["REMOTE", "HYBRID", "ON_SITE"]),
        location: z.string().min(1, "Location is required"),
        start_date: z.string().min(1, "Start date is required"),
        end_date: z.string().min(1, "End date is required"),
        is_current: z.boolean(),
        description: z.string().min(1, "Description is required"),
      }),
    )
    .optional(),
});

