import prisma from "../../config/db.js";
export async function getCertifications(userId) {
    return prisma.certifications.findMany({
        where: { userId },
    });
}
export async function createCertification(userId, data) {
    return prisma.certifications.create({
        data: {
            userId,
            name: data.name,
            issuingOrganization: data.issuingOrganization,
            issueDate: new Date(data.issueDate),
            expiryDate: new Date(data.expiryDate),
            credentialId: data.credentialId,
            credentialUrl: data.credentialUrl,
            description: data.description,
        },
    });
}
export async function updateCertification(id, userId, data) {
    return prisma.certifications.update({
        where: { id, userId },
        data: {
            name: data.name,
            issuingOrganization: data.issuingOrganization,
            issueDate: new Date(data.issueDate),
            expiryDate: new Date(data.expiryDate),
            credentialId: data.credentialId,
            credentialUrl: data.credentialUrl,
            description: data.description,
        },
    });
}
export async function deleteCertification(id, userId) {
    return prisma.certifications.delete({
        where: { id, userId },
    });
}
