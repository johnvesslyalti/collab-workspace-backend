import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Collab Workspace API",
      version: "1.0.0",
      description: "Backend API for projects, jobs, and collaboration"
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            message: { type: "string" }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["src/modules/**/*.ts"]
});
