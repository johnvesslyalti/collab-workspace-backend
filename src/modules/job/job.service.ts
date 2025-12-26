import { jobQueue } from "../../queues/job.queue";
import { jobRepository } from "./job.repository";

export const jobService = {
    async enqueueJob(userId: string, payload: any) {
        // 1️⃣ Create DB record FIRST
        const job = await jobRepository.create(
            userId,
            "TEST_JOB",
            payload
        );

        // 2️⃣ Push job to BullMQ queue
        await jobQueue.add(
            "test-job",
            { jobId: job.id },
            {
                attempts: 3,
                backoff: {
                    type: "exponential",
                    delay: 2000
                }
            }
        );

        return job;
    },

    async getJobById(jobId: string, userId: string) {
        const job = await jobRepository.findById(jobId);

        if (!job) {
            throw new Error("Job not found");
        }

        if (job.userId !== userId) {
            throw new Error("Forbidden");
        }

        return job;
    }
};
