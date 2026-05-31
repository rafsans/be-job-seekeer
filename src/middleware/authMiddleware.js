import { verifyToken } from "../utils/jwt.js";
import prisma from "../config/db.js";
export async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
        res
            .status(401)
            .json({ success: false, message: "Invalid or expired token" });
        return;
    }
    try {
        if (process.env.NODE_ENV !== "test") {
            const userExists = await prisma.user.findUnique({
                where: { id: decoded.userId },
            });
            if (!userExists) {
                res.status(401).json({ success: false, message: "User no longer exists" });
                return;
            }
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
    req.user = decoded;
    next();
}
