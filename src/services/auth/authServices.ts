import bcrypt from "bcryptjs";
import type { Role } from "../../generated/prisma/index.js";
import { generateToken } from "../../utils/jwt.js";

import {
  getUserByEmail,
  getUserById,
  createUser,
} from "../user/userServices.js";

import prisma from "../../config/db.js";

interface RegisterData {
  email: string;
  password: string;
  role?: Role;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResult {
  user: {
    id: string;
    email: string;
    role: Role;
  };
  token: string;
}

export async function register({
  email,
  password,
  role = "CANDIDATE",
}: RegisterData): Promise<AuthResult> {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw Object.assign(new Error("Email already in use"), {
      code: "CONFLICT",
    });
  }

  const user = await createUser({ email, password, role } as any);

  return {
    user: { id: user.id, email: user.email, role: user.role },
  };
}

export async function login({
  email,
  password,
}: LoginData): Promise<AuthResult> {
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

  return {
    user: { id: user.id, email: user.email, role: user.role },
    token,
  };
}

export async function changeEmail(
  userId: string,
  newEmail: string,
  currentPassword: string,
): Promise<void> {
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

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
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
