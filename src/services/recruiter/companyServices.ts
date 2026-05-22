import prisma from "../../config/db.js";

export async function createCompany(userId: string, data: any) {
  return prisma.companies.create({
    data: {
      userId,
      name: data.name,
      description: data.description,
      industry: data.industry,
      website: data.website,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      province: data.province,
      country: data.country,
      companySize: data.company_size,
      logoUrl: data.logo_url,
    },
  });
}

export async function getCompanyByUserId(userId: string) {
  return prisma.companies.findUnique({
    where: { userId },
  });
}

export async function updateCompany(userId: string, data: any) {
  return prisma.companies.update({
    where: { userId },
    data: {
      name: data.name,
      description: data.description,
      industry: data.industry,
      website: data.website,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      province: data.province,
      country: data.country,
      companySize: data.company_size,
      logoUrl: data.logo_url,
    },
  });
}
