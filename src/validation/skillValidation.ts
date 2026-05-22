import { z } from "zod";

export const addSkillSchema = z.object({
  skills: z.array(z.number()).min(1, "At least one skill is required"),
});
