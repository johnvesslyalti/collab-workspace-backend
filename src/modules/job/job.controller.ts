import { Response } from "express";
import { jobService } from "./job.service";
import { AuthenticatedRequest } from "../../utils/types/auth.types";

export const jobController = {
    async create(req: AuthenticatedRequest, res: Response) {
        const userId = req.user!.userId;

        const job = await jobService.enqueueJob(
            userId,
            req.body
        );

        res.status(201).json(job);
    },

    async get(req: AuthenticatedRequest, res: Response) {
        // optional: get job status
    }
};
