import prisma from "../../config/db.js";

export async function getCandidateProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      user_details: true,
      educations: true,
      experiences: true,
      userSkills: {
        include: {
          skill: true,
        },
      },
      applications: true,
    },
  });

  if (!user) {
    throw Object.assign(new Error("User not found"), { code: "NOT_FOUND" });
  }

  const stats = {
    applied_jobs: user.applications.length,
    interview_calls: user.applications.filter((a) => a.status === "INTERVIEW").length,
    profile_views: 0,
    applicant_jobs: user.applications.length,
  };

  return {
    ...stats,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    profile: user.user_details ? {
      personal: {
        firstname: user.user_details.firstName,
        lastname: user.user_details.lastName,
        phone: user.user_details.phone,
        address: user.user_details.address,
        city: user.user_details.city,
        province: user.user_details.province,
        country: user.user_details.country,
        postalCode: user.user_details.postalCode,
        resume_url: user.user_details.resumeUrl,
      },
      education: user.educations.map((edu) => ({
        institution: edu.institution,
        degree: edu.degree,
        field_of_study: edu.fieldOfStudy,
        start_date: edu.startDate.toISOString().split("T")[0],
        end_date: edu.endDate.toISOString().split("T")[0],
        is_current: edu.isCurrent,
        grade: edu.grade,
        description: edu.description,
      })),
      experience: user.experiences.map((exp) => ({
        company: exp.companyName,
        position: exp.position,
        employment_type: exp.employmentType,
        location_type: exp.locationType,
        location: exp.location,
        start_date: exp.startDate.toISOString().split("T")[0],
        end_date: exp.endDate.toISOString().split("T")[0],
        is_current: exp.isCurrent,
        description: exp.description,
      })),


    } : null,
  };
}

export async function updateCandidateProfile(userId: string, data: any) {
  const existingDetails = await prisma.userDetails.findUnique({
    where: { userId },
  });

  if (!existingDetails) {
    throw Object.assign(new Error("Profile not found"), { code: "NOT_FOUND" });
  }

  if (data.personal) {
    await prisma.userDetails.update({
      where: { userId },
      data: {
        firstName: data.personal.firstname,
        lastName: data.personal.lastname,
        phone: data.personal.phone,
        address: data.personal.address,
        city: data.personal.city,
        province: data.personal.province,
        country: data.personal.country,
        postalCode: data.personal.postalCode,
      },
    });
  }

  return { message: "Profile updated successfully" };
}
