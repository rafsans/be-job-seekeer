import { z } from "zod";

export const onboardingSchema = z.object({
  personal: z.object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    province: z.string().min(1, "Province is required"),
    country: z.string().min(1, "Country is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    resume_url: z.string().url().optional(),
  }),
  education: z.array(
    z.object({
      institution: z.string().min(1, "Institution is required"),
      degree: z.string().min(1, "Degree is required"),
      field_of_study: z.string().min(1, "Field of study is required"),
      start_date: z.string().min(1, "Start date is required"),
      end_date: z.string().min(1, "End date is required"),
      is_current: z.boolean(),
      grade: z.union([z.string(), z.number()]),
      description: z.string().min(1, "Description is required"),
    })
  ).optional(),
  experience: z.array(
    z.object({
      company: z.string().min(1, "Company is required"),
      position: z.string().min(1, "Position is required"),
      employment_type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"]),
      location_type: z.enum(["REMOTE", "HYBRID", "ON_SITE"]),
      location: z.string().min(1, "Location is required"),
      start_date: z.string().min(1, "Start date is required"),
      end_date: z.string().min(1, "End date is required"),
      is_current: z.boolean(),
      description: z.string().min(1, "Description is required"),
    })
  ).optional(),
});
