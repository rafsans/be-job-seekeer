import prisma from "../../config/db.js";
import type { Role, User } from "../../generated/prisma";
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

export async function getUserByEmail(email: string) {
  const user: User | null = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

export async function getUserById(id: string) {
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
}

export async function createUser({ email, password, role }: User) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user: User = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      role: role,
    },
  });
  return user;
}

export async function updateUser({ id, email, password, role }: User) {
  const user: User = await prisma.user.update({
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

export async function deleteUser(id: string) {
  const user: User = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return user;
}

export async function getUserDetailsById(id: string) {
  const userDetails = await prisma.userDetails.findUnique({
    where: {
      userId: id,
    },
  });
  return userDetails;
}

export async function getUserDetailsByUserId(userId: string) {
  const userDetails = await prisma.userDetails.findUnique({
    where: {
      userId: userId,
    },
  });
  return userDetails;
}

export async function createUserDetails({
  userId,
  firstName,
  lastName,
  phone,
  dateOfBirth,
  gender,
  address,
  city,
  province,
  postalCode,
  country,
  profilePhotoUrl,
  bio,
  resumeUrl,
}: {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  profilePhotoUrl: string;
  bio: string;
  resumeUrl: string;
}) {
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
      bio: bio,
      resumeUrl: resumeUrl,
    },
  });
  return userDetails;
}

export async function updateUserDetails({
  id,
  firstName,
  lastName,
  phone,
  dateOfBirth,
  gender,
  address,
  city,
  province,
  postalCode,
  country,
  profilePhotoUrl,
  bio,
  resumeUrl,
}: {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  profilePhotoUrl: string;
  bio: string;
  resumeUrl: string;
}) {
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
      bio: bio,
      resumeUrl: resumeUrl,
    },
  });
  return userDetails;
}

export async function deleteUserDetails(id: number) {
  const userDetails = await prisma.userDetails.delete({
    where: {
      id,
    },
  });
  return userDetails;
}
