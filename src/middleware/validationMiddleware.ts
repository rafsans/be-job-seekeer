import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { error } from "../utils/response.js";


export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessage = err.issues.map((issue: any) => ({

          path: issue.path.join("."),
          message: issue.message,
        }));
        return error(400, res, "Validation failed", errorMessage);
      }
      return error(500, res, "Internal server error");
    }
  };
};
