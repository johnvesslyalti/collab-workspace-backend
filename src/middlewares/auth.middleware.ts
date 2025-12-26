import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";
import { AuthenticatedRequest } from "../utils/types/auth.types";

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header missing"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token missing"
        });
    }

    try {
        const decoded = verifyToken(token) as { userId: string };
        req.user = { userId: decoded.userId };
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
