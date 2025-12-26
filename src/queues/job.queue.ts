import { Queue } from "bullmq";
import { redisConnection } from "../lib/redis";

export const jobQueue = new Queue("job-queue", {
    connection: redisConnection
});
