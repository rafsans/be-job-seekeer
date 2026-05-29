import { z } from "zod";

export const companyOnboardingSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  description: z.string().min(1, "Description is required"),
  industry: z.string().min(1, "Industry is required"),
  website: z.string().url().optional().or(z.literal("")),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  country: z.string().min(1, "Country is required"),
  company_size: z.string().min(1, "Company size is required"),
  logo_url: z.string().url().optional().or(z.literal("")),
});

export const postJobSchema = z.object({
  job_title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  requirements: z.array(z.string().min(1)).min(1, "At least one requirement is required"),
  responsibilities: z.array(z.string().min(1)).min(1, "At least one responsibility is required"),
  benefits: z.string().min(1, "Benefits are required"),
  employment_type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY", "INTERN", "OTHER"]),
  location_type: z.enum(["ONSITE", "REMOTE", "HYBRID"]),
  location: z.string().min(1, "Location is required"),
  min_salary: z.number().min(0),
  max_salary: z.number().min(0),
  currency: z.string().min(1, "Currency is required"),
  experience_level: z.string().min(1, "Experience level is required"),
  education_level: z.string().min(1, "Education level is required"),
  deadline: z.string().min(1, "Deadline is required"),
  skills: z.array(z.number()).optional(),
  category_id: z.number().optional(),
});

export const updateJobSchema = z.object({
  job_title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  requirements: z.array(z.string().min(1)).min(1).optional(),
  responsibilities: z.array(z.string().min(1)).min(1).optional(),
  benefits: z.string().min(1, "Benefits are required").optional(),
  employment_type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY", "INTERN", "OTHER"]).optional(),
  location_type: z.enum(["ONSITE", "REMOTE", "HYBRID"]).optional(),
  location: z.string().min(1, "Location is required").optional(),
  min_salary: z.number().min(0).optional(),
  max_salary: z.number().min(0).optional(),
  currency: z.string().min(1, "Currency is required").optional(),
  experience_level: z.string().min(1, "Experience level is required").optional(),
  education_level: z.string().min(1, "Education level is required").optional(),
  deadline: z.string().min(1, "Deadline is required").optional(),
  skills: z.array(z.number()).optional(),
  category_id: z.number().optional(),
});

export const acceptRejectSchema = z.object({
  action: z.enum(["accept", "reject"]),
  reason: z.string().optional(),
});

export const companyUpdateSchema = z.object({
  name: z.string().min(1, "Company name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  industry: z.string().min(1, "Industry is required").optional(),
  website: z.string().url().optional().or(z.literal("")),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().min(1, "Phone is required").optional(),
  address: z.string().min(1, "Address is required").optional(),
  city: z.string().min(1, "City is required").optional(),
  province: z.string().min(1, "Province is required").optional(),
  country: z.string().min(1, "Country is required").optional(),
  company_size: z.string().min(1, "Company size is required").optional(),
  logo_url: z.string().url().optional().or(z.literal("")),
});
