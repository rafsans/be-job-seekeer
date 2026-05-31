import { z } from "zod";
export const experienceSchema = z.object({
    company: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    employment_type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"]),
    location_type: z.enum(["REMOTE", "HYBRID", "ON_SITE"]),
    location: z.string().min(1, "Location is required"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    is_current: z.boolean(),
    description: z.string().min(1, "Description is required"),
});
