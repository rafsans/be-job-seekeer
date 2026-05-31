import prisma from "../../config/db.js";
export async function getEducations(userId) {
    return prisma.educations.findMany({
        where: { userId },
    });
}
export async function createEducation(userId, data) {
    return prisma.educations.create({
        data: {
            userId,
            institution: data.institution,
            degree: data.degree,
            fieldOfStudy: data.field_of_study,
            startDate: new Date(data.start_date),
            endDate: new Date(data.end_date),
            isCurrent: data.is_current,
            grade: String(data.grade),
            description: data.description,
        },
    });
}
export async function updateEducation(id, userId, data) {
    return prisma.educations.update({
        where: { id, userId },
        data: {
            institution: data.institution,
            degree: data.degree,
            fieldOfStudy: data.field_of_study,
            startDate: new Date(data.start_date),
            endDate: new Date(data.end_date),
            isCurrent: data.is_current,
            grade: String(data.grade),
            description: data.description,
        },
    });
}
export async function deleteEducation(id, userId) {
    return prisma.educations.delete({
        where: { id, userId },
    });
}
