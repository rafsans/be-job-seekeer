import prisma from "../../config/db.js";

export async function getEducations(userId: string) {
  return await prisma.educations.findMany({
    where: { userId },
  });
}

export async function createEducation(userId: string, data: any) {
  return await prisma.educations.create({
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

export async function updateEducation(id: number, userId: string, data: any) {
  return await prisma.educations.update({
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

export async function deleteEducation(id: number, userId: string) {
  return await prisma.educations.delete({
    where: { id, userId },
  });
}
