import { z } from "zod";
export const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
    role: z.enum(["CANDIDATE", "RECRUITER"], {
        message: "Role must be either CANDIDATE or RECRUITER",
    }),
});
export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});
export const changeEmailSchema = z.object({
    new_email: z.string().email({ message: "Invalid email address" }),
    current_password: z
        .string()
        .min(1, { message: "Current password is required" }),
});
export const changePasswordSchema = z.object({
    current_password: z
        .string()
        .min(1, { message: "Current password is required" }),
    new_password: z
        .string()
        .min(8, { message: "New password must be at least 8 characters long" }),
});
