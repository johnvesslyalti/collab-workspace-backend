import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes"
import projectRoutes from "./modules/project/project.routes"
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
