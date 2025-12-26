import { Response } from "express";
import { projectService } from "./project.service";
import { AuthenticatedRequest } from "../../utils/types/auth.types";
import { Role } from "../../generated/prisma/enums";

export const projectController = {
    async create(req: AuthenticatedRequest, res: Response) {
        try {
            const { name, description } = req.body;
            const userId = req.user!.userId;

            const project = await projectService.createProject(
                userId,
                name,
                description
            );

            return res.status(201).json(project);
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }
    },

    async list(req: AuthenticatedRequest, res: Response) {
        const userId = req.user!.userId;
        const projects = await projectService.getMyProjects(userId);
        res.json(projects);
    },

    async get(req: AuthenticatedRequest, res: Response) {
        const project = await projectService.getProject(req.params.projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    },

    async update(req: AuthenticatedRequest, res: Response) {
        const project = await projectService.updateProject(
            req.params.projectId,
            req.body
        );
        res.json(project);
    },

    async remove(req: AuthenticatedRequest, res: Response) {
        await projectService.deleteProject(req.params.projectId);
        res.status(204).json({ message: "Project deleted successfully" });
    },

    async invite(req: AuthenticatedRequest, res: Response) {
        const { userId, role } = req.body;

        if (!userId || !role) {
            return res.status(400).json({ message: "userId and role required" });
        }

        const member = await projectService.inviteUser(
            req.params.projectId,
            userId,
            role as Role
        );

        res.status(201).json(member);
    }
};
