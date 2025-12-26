import { prisma } from "../../lib/prisma";

export const jobRepository = {
    create(userId: string, type: string, payload: any) {
        return prisma.job.create({
            data: {
                userId,
                type,
                payload,
                status: "PENDING"
            }
        });
    },

    updateStatus(jobId: string, status: "PROCESSING" | "COMPLETED" | "FAILED", result?: any) {
        return prisma.job.update({
            where: { id: jobId },
            data: {
                status,
                result
            }
        });
    },

    findById(jobId: string) {
        return prisma.job.findUnique({
            where: { id: jobId }
        });
    }
};
