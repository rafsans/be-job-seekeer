import { ZodError } from "zod";
import { error } from "../utils/response.js";
export const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (err) {
            if (err instanceof ZodError) {
                const errorMessage = err.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message,
                }));
                return error(422, res, "Validation failed", errorMessage);
            }
            return error(500, res, "Internal server error");
        }
    };
};
