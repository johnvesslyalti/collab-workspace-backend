import { Router } from "express";
import { projectController } from "./project.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireProjectRole } from "../../middlewares/rbac.middleware";
import { Role } from "../../generated/prisma/enums";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management and collaboration
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created successfully
 *       401:
 *         description: Unauthorized
 */
router.use(authMiddleware);
router.post("/", projectController.create);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: List projects for the authenticated user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 *       401:
 *         description: Unauthorized
 */
router.get("/", projectController.list);

/**
 * @swagger
 * /projects/{projectId}:
 *   get:
 *     summary: Get project details by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project details
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 */
router.get(
    "/:projectId",
    requireProjectRole([Role.OWNER, Role.COLLABORATOR, Role.VIEWER]),
    projectController.get
);

/**
 * @swagger
 * /projects/{projectId}:
 *   put:
 *     summary: Update project details
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 */
router.put(
    "/:projectId",
    requireProjectRole([Role.OWNER, Role.COLLABORATOR]),
    projectController.update
);

/**
 * @swagger
 * /projects/{projectId}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Project deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 */
router.delete(
    "/:projectId",
    requireProjectRole([Role.OWNER]),
    projectController.remove
);

/**
 * @swagger
 * /projects/{projectId}/invite:
 *   post:
 *     summary: Invite a user to a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, role]
 *             properties:
 *               userId:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [OWNER, COLLABORATOR, VIEWER]
 *     responses:
 *       201:
 *         description: User invited successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 */
router.post(
    "/:projectId/invite",
    requireProjectRole([Role.OWNER]),
    projectController.invite
);

export default router;
