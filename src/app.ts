import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes"
import projectRoutes from "./modules/project/project.routes"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes)

export default app;
