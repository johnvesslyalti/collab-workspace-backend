import { Router } from "express";
import { jobController } from "./job.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, jobController.create);
router.get("/:id", authMiddleware, jobController.getById);

export default router;
