import prisma from "../../config/db.js";
import bcrypt from "bcryptjs";
export async function getAllUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            role: true,
            isActive: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return users;
}
export async function getUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    return user;
}
export async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    return user;
}
export async function createUser({ email, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
            role: role,
        },
    });
    return user;
}
export async function updateUser({ id, email, password, role }) {
    const user = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            email: email,
            password: password,
        },
    });
    return user;
}
export async function deleteUser(id) {
    const user = await prisma.user.delete({
        where: {
            id: id,
        },
    });
    return user;
}
export async function getUserDetailsById(id) {
    const userDetails = await prisma.userDetails.findUnique({
        where: {
            userId: id,
        },
    });
    return userDetails;
}
export async function getUserDetailsByUserId(userId) {
    const userDetails = await prisma.userDetails.findUnique({
        where: {
            userId: userId,
        },
    });
    return userDetails;
}
export async function createUserDetails({ userId, firstName, lastName, phone, dateOfBirth, gender, address, city, province, postalCode, country, profilePhotoUrl, resumeUrl, }) {
    const userDetails = await prisma.userDetails.create({
        data: {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            dateOfBirth: dateOfBirth,
            gender: gender,
            address: address,
            city: city,
            province: province,
            postalCode: postalCode,
            country: country,
            profilePhotoUrl: profilePhotoUrl,
            resumeUrl: resumeUrl,
        },
    });
    return userDetails;
}
export async function updateUserDetails({ id, firstName, lastName, phone, dateOfBirth, gender, address, city, province, postalCode, country, profilePhotoUrl, resumeUrl, }) {
    const userDetails = await prisma.userDetails.update({
        where: {
            id: id,
        },
        data: {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            dateOfBirth: dateOfBirth,
            gender: gender,
            address: address,
            city: city,
            province: province,
            postalCode: postalCode,
            country: country,
            profilePhotoUrl: profilePhotoUrl,
            resumeUrl: resumeUrl,
        },
    });
    return userDetails;
}
export async function deleteUserDetails(id) {
    const userDetails = await prisma.userDetails.delete({
        where: {
            id,
        },
    });
    return userDetails;
}
