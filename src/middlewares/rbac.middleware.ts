import { Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { AuthenticatedRequest } from "../utils/types/auth.types";
import { Role } from "../generated/prisma/enums";

/**
 * RBAC middleware for project-level authorization
 * @param allowedRoles Roles that can access the resource
 */
export const requireProjectRole = (allowedRoles: Role[]) => {
    return async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) => {
        const userId = req.user?.userId;
        const projectId = req.params.projectId;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        if (!projectId) {
            return res.status(400).json({
                message: "Project ID missing in route params"
            });
        }

        const membership = await prisma.projectMember.findUnique({
            where: {
                userId_projectId: {
                    userId,
                    projectId
                }
            }
        });

        if (!membership) {
            return res.status(403).json({
                message: "You are not a member of this project"
            });
        }

        if (!allowedRoles.includes(membership.role)) {
            return res.status(403).json({
                message: "Insufficient permissions"
            });
        }

        next();
    };
};
