import { z } from "zod";
export const certificationSchema = z.object({
    name: z.string().min(1, "Certification name is required"),
    issuingOrganization: z.string().min(1, "Issuing organization is required"),
    issueDate: z.string().min(1, "Issue date is required"),
    expiryDate: z.string().min(1, "Expiry date is required"),
    credentialId: z.string().optional(),
    credentialUrl: z.string().url().optional().or(z.literal("")),
    description: z.string().min(1, "Description is required"),
});
