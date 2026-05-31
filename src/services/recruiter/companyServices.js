import prisma from "../../config/db.js";
export async function createCompany(userId, data) {
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
export async function getCompanyByUserId(userId) {
    return prisma.companies.findUnique({
        where: { userId },
    });
}
export async function getCompanyById(companyId) {
    return prisma.companies.findUnique({
        where: { id: companyId },
        include: {
            jobs: {
                where: { isActive: true },
                orderBy: { createdAt: 'desc' },
                take: 10,
                include: {
                    category: true,
                },
            },
        },
    });
}
export async function updateCompany(userId, data) {
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
