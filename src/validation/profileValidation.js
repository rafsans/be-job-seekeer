import { z } from "zod";
export const updateProfileSchema = z.object({
    personal: z.object({
        firstname: z.string().optional(),
        lastname: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        province: z.string().optional(),
        country: z.string().optional(),
        postalCode: z.string().optional(),
    }).optional(),
});
