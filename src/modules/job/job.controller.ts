import { Response } from "express";
import { jobService } from "./job.service";
import { AuthenticatedRequest } from "../../utils/types/auth.types";

export const jobController = {
    async create(req: AuthenticatedRequest, res: Response) {
        const userId = req.user!.userId;

        const job = await jobService.enqueueJob(userId, req.body);

        return res.status(201).json(job);
    },

    async getById(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.user!.userId;
            const jobId = req.params.id;

            const job = await jobService.getJobById(jobId, userId);

            return res.json(job);
        } catch (err: any) {
            if (err.message === "Job not found") {
                return res.status(404).json({ message: err.message });
            }

            if (err.message === "Forbidden") {
                return res.status(403).json({ message: "Access denied" });
            }

            return res.status(500).json({ message: err.message });
        }
    }
};
