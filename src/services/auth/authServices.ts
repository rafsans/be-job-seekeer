// import bcrypt from "bcryptjs";
// import type { Role } from "@prisma/client";
// import { generateToken } from "../../utils/jwt.js";
// import { getUserByEmail, createUser } from "../user/userServices.js";

// interface RegisterData {
//   email: string;
//   password: string;
//   role?: Role;
// }

// interface LoginData {
//   email: string;
//   password: string;
// }

// interface AuthResult {
//   user: {
//     id: string;
//     email: string;
//     role: Role;
//   };
//   token: string;
// }

// export async function register({
//   email,
//   password,
//   role = "CANDIDATE",
// }: RegisterData): Promise<AuthResult> {
//   const existingUser = await getUserByEmail(email);
//   if (existingUser) {
//     throw new Error("Email already exists");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await createUser({ email, password: hashedPassword, role });
//   const token = generateToken({ userId: user.id, role: user.role });

//   return {
//     user: {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//     },
//     token,
//   };
// }

// export async function login({
//   email,
//   password,
// }: LoginData): Promise<AuthResult> {
//   const user = await getUserByEmail(email);
//   if (!user) {
//     throw new Error("Invalid credentials");
//   }

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) {
//     throw new Error("Invalid credentials");
//   }

//   const token = generateToken({ userId: user.id, role: user.role });

//   return {
//     user: {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//     },
//     token,
//   };
// }
