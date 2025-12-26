import { Router } from "express";
import { projectController } from "./project.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireProjectRole } from "../../middlewares/rbac.middleware";
import { Role } from "../../generated/prisma/enums";

const router = Router();

router.use(authMiddleware);

router.post("/", projectController.create);
router.get("/", projectController.list);

router.get(
    "/:projectId",
    requireProjectRole([Role.OWNER, Role.COLLABORATOR, Role.VIEWER]),
    projectController.get
);

router.put(
    "/:projectId",
    requireProjectRole([Role.OWNER, Role.COLLABORATOR]),
    projectController.update
);

router.delete(
    "/:projectId",
    requireProjectRole([Role.OWNER]),
    projectController.remove
);

router.post(
    "/:projectId/invite",
    requireProjectRole([Role.OWNER]),
    projectController.invite
);

export default router;
