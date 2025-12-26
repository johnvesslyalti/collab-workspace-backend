import { Worker } from "bullmq";
import { prisma } from "../lib/prisma";
import { redisConnection } from "../lib/redis";

const worker = new Worker(
    "job-queue",
    async (job) => {
        console.log(`Processing job ${job.id}`, job.data);

        await prisma.job.update({
            where: { id: job.data.jobId },
            data: { status: "PROCESSING" }
        });

        await new Promise((resolve) => setTimeout(resolve, 3000));

        if (Math.random() < 0.3) {
            throw new Error("Simulated job failure");
        }

        await prisma.job.update({
            where: { id: job.data.jobId },
            data: {
                status: "COMPLETED",
                result: { output: "Job executed successfully" }
            }
        });

        return { success: true };
    },
    {
        connection: redisConnection,
        concurrency: 2
    }
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on("failed", async (job, err) => {
    console.error(`Job ${job?.id} failed`, err.message);

    if (job?.data?.jobId) {
        await prisma.job.update({
            where: { id: job.data.jobId },
            data: { status: "FAILED" }
        })
    }
})
