import { Router } from "express";
import { jobController } from "./job.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Asynchronous job processing APIs
 */

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new asynchronous job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Payload for the job (flexible JSON)
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 status:
 *                   type: string
 *                   example: PENDING
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, jobController.create);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get job status by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 status:
 *                   type: string
 *                   example: COMPLETED
 *                 result:
 *                   type: object
 *                   nullable: true
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Job not found
 */
router.get("/:id", authMiddleware, jobController.getById);

export default router;
