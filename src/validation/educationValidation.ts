import { z } from "zod";

export const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field_of_study: z.string().min(1, "Field of study is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  is_current: z.boolean(),
  grade: z.union([z.string(), z.number()]),
  description: z.string().min(1, "Description is required"),
});
