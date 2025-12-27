# Collab Workspace Backend

A backend service for managing collaborative projects with role-based access control and asynchronous job processing.  
Built with a focus on correctness, scalability, and clean architecture under limited time constraints.

---

## 📌 Overview

This application provides APIs for:
- User authentication
- Project and collaborator management with RBAC
- Asynchronous job processing using Redis-backed queues
- Secure and well-documented REST APIs

The system is designed to be **modular, scalable, and deployment-ready**, while remaining easy to run locally.

---

## 🏗️ Architecture

The backend follows a layered architecture:  
**Routes → Controllers → Services → Repositories → Database**

### Key Components
- **API Server**: Node.js + Express
- **Database**: PostgreSQL (via Prisma ORM)
- **Queue**: Redis + BullMQ
- **Worker**: Separate process for background job execution
- **Docs**: Swagger (OpenAPI)

---

## 🔐 Authentication & Authorization

### Authentication
- JWT-based authentication
- Access tokens required for all protected routes
- Token expiry enforced

### Authorization (RBAC)
Project-level roles:
- **OWNER**: Full access (Manage members, Delete project)
- **COLLABORATOR**: Read/Write access
- **VIEWER**: Read-only access

RBAC is enforced via custom middleware before controller execution to ensure data isolation.

---

## 🔄 Asynchronous Job Processing

Background jobs are handled using **BullMQ** and **Redis** to ensure the main API remains responsive.

### Job Flow
1. **Client** sends request to `POST /jobs`.
2. **API** creates a job record in the DB and enqueues it in **Redis**.
3. **Worker** picks up the job and processes it.
4. **API** provides status updates via `GET /jobs/:id`.

### Job Status Lifecycle
- `PENDING` → `PROCESSING` → `COMPLETED` / `FAILED`

---

## ⚡ Performance & Indexing

Indexes were strategically added to optimize frequent query paths:
- User email lookup for fast authentication.
- Project membership lookups to speed up RBAC checks.
- Job status and User-ID filtering for dashboard performance.

---

## 📚 API Documentation

All APIs are documented using **Swagger (OpenAPI)**.

After starting the server, access the interactive docs at:  
`http://localhost:3000/docs`

---

## ⚖️ Trade-offs & Design Decisions

Due to the limited timeframe, the following trade-offs were made:

- **Polling over WebSockets**: Job status is retrieved via polling. This kept the architecture lean while meeting functional requirements.
- **Docker-First Environment**: Used Docker Compose for Redis and Postgres to ensure "it works on my machine" translates to "it works on yours."
- **Manual Integration Testing**: Prioritized validating end-to-end flows via Swagger/Postman over 100% unit test coverage to ensure the core business logic is sound.

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose

### Steps

```bash
# 1. Start database and Redis
docker-compose up -d

# 2. Install dependencies
npm install

# 3. Apply database schema
npx prisma migrate dev

# 4. Start API server
npm run dev

# 5. Start background worker (in a separate terminal)
npm run worker