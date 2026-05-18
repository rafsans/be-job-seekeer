import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";


export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1]!;
  const decoded = verifyToken(token);

  if (!decoded) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
    return;
  }

  req.user = decoded;
  next();
}
