import prisma from "../../config/db.js";
export async function getExperiences(userId) {
    return prisma.experiences.findMany({
        where: { userId },
    });
}
export async function createExperience(userId, data) {
    return prisma.experiences.create({
        data: {
            userId,
            companyName: data.company,
            position: data.position,
            employmentType: data.employment_type,
            locationType: data.location_type === "ON_SITE" ? "ONSITE" : data.location_type,
            location: data.location,
            startDate: new Date(data.start_date),
            endDate: new Date(data.end_date),
            isCurrent: data.is_current,
            description: data.description,
        },
    });
}
export async function updateExperience(id, userId, data) {
    return prisma.experiences.update({
        where: { id, userId },
        data: {
            companyName: data.company,
            position: data.position,
            employmentType: data.employment_type,
            locationType: data.location_type === "ON_SITE" ? "ONSITE" : data.location_type,
            location: data.location,
            startDate: new Date(data.start_date),
            endDate: new Date(data.end_date),
            isCurrent: data.is_current,
            description: data.description,
        },
    });
}
export async function deleteExperience(id, userId) {
    return prisma.experiences.delete({
        where: { id, userId },
    });
}
