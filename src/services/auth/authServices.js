import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt.js";
import { getUserByEmail, getUserById, createUser, } from "../user/userServices.js";
import prisma from "../../config/db.js";
export async function register({ email, password, role = "CANDIDATE", }) {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw Object.assign(new Error("Email already in use"), {
            code: "CONFLICT",
        });
    }
    const user = await createUser({ email, password, role });
    return {
        user: { id: user.id, email: user.email, role: user.role },
    };
}
export async function login({ email, password, }) {
    const user = await getUserByEmail(email);
    if (!user) {
        throw Object.assign(new Error("Invalid credentials"), {
            code: "UNAUTHORIZED",
        });
    }
    if (!user.isActive) {
        throw Object.assign(new Error("Account is deactivated"), {
            code: "UNAUTHORIZED",
        });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw Object.assign(new Error("Invalid credentials"), {
            code: "UNAUTHORIZED",
        });
    }
    const token = generateToken({ userId: user.id, role: user.role });
    let isOnboarded = false;
    if (user.role === "CANDIDATE") {
        const details = await prisma.userDetails.findUnique({
            where: { userId: user.id },
        });
        isOnboarded = !!details;
    }
    else if (user.role === "RECRUITER") {
        const company = await prisma.companies.findUnique({
            where: { userId: user.id },
        });
        isOnboarded = !!company;
    }
    return {
        user: { id: user.id, email: user.email, role: user.role, isOnboarded },
        token,
    };
}
export async function changeEmail(userId, newEmail, currentPassword) {
    const user = await getUserById(userId);
    if (!user) {
        throw Object.assign(new Error("User not found"), { code: "NOT_FOUND" });
    }
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
        throw Object.assign(new Error("Current password is incorrect"), {
            code: "UNAUTHORIZED",
        });
    }
    const existing = await getUserByEmail(newEmail);
    if (existing) {
        throw Object.assign(new Error("Email already in use"), {
            code: "CONFLICT",
        });
    }
    await prisma.user.update({
        where: { id: userId },
        data: { email: newEmail },
    });
}
export async function changePassword(userId, currentPassword, newPassword) {
    const user = await getUserById(userId);
    if (!user) {
        throw Object.assign(new Error("User not found"), { code: "NOT_FOUND" });
    }
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
        throw Object.assign(new Error("Current password is incorrect"), {
            code: "UNAUTHORIZED",
        });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });
}

// Compute euclidean distance between two 128-d descriptors
function euclideanDistance(desc1, desc2) {
    if (!desc1 || !desc2 || desc1.length !== desc2.length) return Infinity;
    return Math.sqrt(desc1.reduce((sum, val, i) => sum + Math.pow(val - desc2[i], 2), 0));
}

export async function registerFace(userId, faceDescriptor) {
    const user = await getUserById(userId);
    if (!user) {
        throw Object.assign(new Error("User not found"), { code: "NOT_FOUND" });
    }
    
    await prisma.userBiometrics.upsert({
        where: { userId },
        update: { faceDescriptor },
        create: { userId, faceDescriptor }
    });
}

export async function loginWithFace(faceDescriptor) {
    const allBiometrics = await prisma.userBiometrics.findMany({
        include: { user: true }
    });
    
    let bestMatch = null;
    let minDistance = Infinity;
    
    for (const record of allBiometrics) {
        const storedDescriptor = record.faceDescriptor;
        const distance = euclideanDistance(faceDescriptor, storedDescriptor);
        if (distance < minDistance) {
            minDistance = distance;
            bestMatch = record;
        }
    }
    
    // threshold commonly used for face-api.js is 0.6
    if (bestMatch && minDistance < 0.6) {
        const user = bestMatch.user;
        if (!user.isActive) {
            throw Object.assign(new Error("Account is deactivated"), { code: "UNAUTHORIZED" });
        }
        
        const token = generateToken({ userId: user.id, role: user.role });
        let isOnboarded = false;
        if (user.role === "CANDIDATE") {
            const details = await prisma.userDetails.findUnique({
                where: { userId: user.id },
            });
            isOnboarded = !!details;
        } else if (user.role === "RECRUITER") {
            const company = await prisma.companies.findUnique({
                where: { userId: user.id },
            });
            isOnboarded = !!company;
        }
        
        return {
            user: { id: user.id, email: user.email, role: user.role, isOnboarded },
            token,
            distance: minDistance
        };
    }
    
    throw Object.assign(new Error("Face not recognized"), { code: "UNAUTHORIZED" });
}
