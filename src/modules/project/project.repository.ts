import { Role } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

export const projectRepository = {
    createProject(userId: string, name: string, description?: string) {
        return prisma.project.create({
            data: {
                name,
                description,
                ownerId: userId,
                members: {
                    create: {
                        userId,
                        role: Role.OWNER
                    }
                }
            }
        });
    },

    getUserProjects(userId: string) {
        return prisma.project.findMany({
            where: {
                members: {
                    some: {
                        userId
                    }
                }
            }
        });
    },

    findById(projectId: string) {
        return prisma.project.findUnique({
            where: { id: projectId }
        });
    },

    updateProject(projectId: string, data: { name?: string; description?: string }) {
        return prisma.project.update({
            where: { id: projectId },
            data
        });
    },

    deleteProject(projectId: string) {
        return prisma.project.delete({
            where: { id: projectId }
        });
    },

    addMember(projectId: string, userId: string, role: Role) {
        return prisma.projectMember.create({
            data: {
                projectId,
                userId,
                role
            }
        });
    }
};
