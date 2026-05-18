import prisma from "../../config/db.js";

export async function getCertifications(userId: string) {
  return await prisma.certifications.findMany({
    where: { userId },
  });
}

export async function createCertification(userId: string, data: any) {
  return await prisma.certifications.create({
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

export async function updateCertification(id: number, userId: string, data: any) {
  return await prisma.certifications.update({
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

export async function deleteCertification(id: number, userId: string) {
  return await prisma.certifications.delete({
    where: { id, userId },
  });
}
