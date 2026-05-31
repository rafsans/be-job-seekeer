import prisma from "../../config/db.js";
export async function updateResumeUrl(userId, resumeUrl) {
    return prisma.userDetails.update({
        where: { userId },
        data: {
            resumeUrl: resumeUrl,
        },
    });
}
export async function saveTopCategories(userId, predictions) {
    // predictions is an array of dicts e.g. [{label: "...", ...}, ...]
    const cat1 = predictions[0]?.label || predictions[0]?.category || null;
    const cat2 = predictions[1]?.label || predictions[1]?.category || null;
    const cat3 = predictions[2]?.label || predictions[2]?.category || null;

    return prisma.userTopCategories.upsert({
        where: { userId },
        update: {
            category1: cat1,
            category2: cat2,
            category3: cat3,
        },
        create: {
            userId,
            category1: cat1,
            category2: cat2,
            category3: cat3,
        },
    });
}
