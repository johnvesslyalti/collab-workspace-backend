import { Role } from "../../generated/prisma/enums";
import { projectRepository } from "./project.repository";

export const projectService = {
    createProject(userId: string, name: string, description?: string) {
        if (!name) {
            throw new Error("Project name is required");
        }
        return projectRepository.createProject(userId, name, description);
    },

    getMyProjects(userId: string) {
        return projectRepository.getUserProjects(userId);
    },

    getProject(projectId: string) {
        return projectRepository.findById(projectId);
    },

    updateProject(
        projectId: string,
        data: { name?: string; description?: string }
    ) {
        return projectRepository.updateProject(projectId, data);
    },

    deleteProject(projectId: string) {
        return projectRepository.deleteProject(projectId);
    },

    inviteUser(projectId: string, userId: string, role: Role) {
        return projectRepository.addMember(projectId, userId, role);
    }
};
