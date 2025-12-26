import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes"
import projectRoutes from "./modules/project/project.routes"
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import jobRoutes from "./modules/job/job.routes"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/jobs", jobRoutes);

export default app;
