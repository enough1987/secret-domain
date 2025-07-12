# Todo Fullstack App

This project is a fullstack application with a React frontend (built with Vite), a Node.js/NestJS backend, and AWS infrastructure using S3, EC2, CloudFront, Route 53. Deployment is automated via GitHub Actions.

## Architecture Diagram

```
+-------------------+        +-------------------+        +-----------------------+
|                   |        |                   |        |                       |
|      Browser      +------->+    CloudFront     +------->+          S3              |
|   (User Client)   | HTTPS  | (CDN & Routing)   |  /*    | (Frontend SPA Static) |
|                   |        |                   |        |                       |
+-------------------+        +-------------------+        +-----------------------+
                                    |
                                    | /api/*
                                    v
                            +-------------------+
                            |                   |
                            |       EC2         |
                            |   (Nginx +        |
                            |   Backend API)    |
                            +-------------------+
                                    |
                                    | Prisma ORM
                                    v
                            +-------------------+
                            |                   |
                            |      RDS          |
                            |  (PostgreSQL)     |
                            +-------------------+

+-------------------+        +-------------------+
|                   |        |                   |
|  GitHub Actions   +------->+      ECR          |
|   (CI/CD)         | Push   | (Docker Images)   |
+-------------------+        +-------------------+
                                    ^
                                    |
                                    | docker-compose pull
                                    |
                            +-------------------+
                            |                   |
                            |       EC2         |
                            |   (Backend)       |
                            +-------------------+
```

**Legend:**

- **Browser:** End user accessing your app.
- **CloudFront:** CDN and HTTPS entry point.
- **S3:** Hosts frontend static files.
- **EC2:** Runs Nginx (reverse proxy) and backend (NestJS).
- **RDS:** Managed PostgreSQL database.
- **ECR:** Stores backend Docker images.
- **GitHub Actions:** CI/CD pipeline for building and deploying.

---

_For more details, see the workflow in `.github/workflows/deploy.yml`._

## Workflow Diagram

````

- **A:** Developer pushes code to main branch.
- **B:** GitHub Actions workflow starts.
- **C:** Backend Docker image is built and pushed to ECR.
- **D:** Frontend is built and uploaded to S3.
- **E:** EC2 instance pulls the new backend image and restarts containers via SSH and docker-compose.
- **F:** CloudFront cache is invalidated so users get the latest frontend and API.

## Request Flow

1. **User visits** [https://secret-domain.net](https://secret-domain.net)
   - CloudFront serves static files from S3.
2. **User/API calls** [https://secret-domain.net/api/todos](https://secret-domain.net/api/todos)
   - CloudFront routes `/api/*` to EC2’s Nginx, which proxies to the backend container.
3. **All other paths** (e.g., `/`, `/about`, `/static/*`)
   - CloudFront serves from S3 (with SPA routing via CloudFront Function if needed).

## AWS Architecture Overview

### 1. S3 (Amazon Simple Storage Service)

- **Purpose:** Hosts your built frontend (static files: HTML, JS, CSS, images).
- **Access:** Not public; CloudFront is granted access via Origin Access Control (OAC).
- **Bucket:** `todo-app2025-frontend`

### 2. CloudFront (Content Delivery Network)

- **Purpose:** Serves as the global entry point for your app, providing HTTPS, caching, and routing.
- **Origins:**
  - **S3 Origin:** Serves all frontend files (default behavior `*`).
  - **EC2 Origin:** Proxies API requests (`/api/*`) to your backend server.
- **Behaviors:**
  - `*` → S3 origin (serves frontend)
  - `/api/*` → EC2 origin (serves backend API)
- **Security:** Uses OAC to securely fetch files from S3, even with S3 "Block all public access" enabled.
- **Custom Domain:** Uses [https://secret-domain.net](https://secret-domain.net) via Route 53 and ACM certificate.

### 3. EC2 (Elastic Compute Cloud)

- **Purpose:** Runs your backend (Node.js/NestJS) and Nginx as a reverse proxy.
- **Deployment:** Automated via GitHub Actions using SSH and Docker Compose.
- **Nginx:** Listens on port 80 (HTTP), proxies `/api/` requests to the backend container.
- **Backend:** Dockerized Node.js/NestJS app, listens on port 3001.

### 4. Route 53 (DNS)

- **Purpose:** Manages DNS for your custom domain.
- **Setup:** An A/ALIAS record points `secret-domain.net` to your CloudFront distribution.

### 5. GitHub Actions (CI/CD)

- **Purpose:** Automates deployment for both frontend and backend.
- **Frontend:** Builds and uploads to S3, then invalidates CloudFront cache.
- **Backend:** SSHs into EC2, pulls latest code, and restarts Docker Compose services.

### 6. Security

- **S3:** "Block all public access" is ON. Only CloudFront (via OAC) can read objects.
- **CloudFront:** Handles HTTPS for both frontend and API.
- **EC2:** Only accessible via SSH for deployment and by CloudFront for API requests.

## Local Development

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Node.js (for local frontend development)

### Running Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/enough1987/secret-domain.git
   cd secret-domain
````

2. **Start backend and Nginx (with local build):**

   > **Note:**  
   > The project uses a `docker-compose.override.yml` file.  
   > This allows you to build the backend image locally for development,  
   > while production/EC2 pulls the prebuilt image from Amazon ECR.

   ```bash
   docker-compose up --build
   ```

   - This will build the backend image from your local Dockerfile and start all services.

3. **Start frontend (in another terminal):**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the app:**
   - Frontend: [https://secret-domain.net/](https://secret-domain.net)
   - API: [https://secret-domain.net/api/todos](https://secret-domain.net/api/todos)
   - Swagger [https://secret-domain.net/api/swagger](https://secret-domain.net/api/swagger)

---

### Deploying to Production (EC2 + ECR)

- The backend Docker image is built and pushed to Amazon ECR by GitHub Actions.
- On EC2, the deployment script **pulls the image from ECR** and starts the containers.

**Manual steps on EC2 (if needed):**

```bash
cd ~/secret-domain
docker-compose pull
docker-compose up -d
```

- This will pull the latest backend image from ECR and start all services (no local build on EC2).

---

### How Docker Compose Works in This Project

- **Local development:**
  - Uses `docker-compose.override.yml` to build the backend image from your local source.
  - Run with:
    ```bash
    docker-compose up --build
    ```
- **Production/EC2:**
  - Uses only `docker-compose.yml` (no override).
  - Pulls the prebuilt backend image from ECR.
  - Run with:
    ```bash
    docker-compose pull
    docker-compose up -d
    ```

---

**Tip:**  
If you want to test the production image locally, you can log in to ECR and pull the image:

```bash
aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <your-ecr-registry>
docker pull <your-ecr-registry>/<your-repo>:latest
```

---

## Environment Variables

- **Frontend:**  
  Set `VITE_API_URL` in `.env.production` to your CloudFront domain (e.g., `https://secret-domain.net/api`).

- **Backend:**  
  Configure as needed in your Docker Compose or environment.

---

## Useful Commands

- **Deploy frontend manually:**

  ```bash
  aws s3 sync ./frontend/dist s3://todo-app2025-frontend --delete
  aws cloudfront create-invalidation --distribution-id <YOUR_DISTRIBUTION_ID> --paths "/*"
  ```

- **Deploy backend manually (on EC2):**
  ```bash
  cd ~/secret-domain
  git pull
  docker-compose up --build -d
  ```

---

## Troubleshooting

- **403 Forbidden from CloudFront:**  
  Check S3 bucket policy and OAC attachment.
- **API requests hang:**  
  Ensure backend is listening on `0.0.0.0:3001` and Nginx is proxying `/api/` correctly.
- **Frontend not updating:**  
  Make sure CloudFront cache is invalidated after deploy.

---

## License

MIT

---

## API Documentation (Swagger)

This project uses [Swagger](https://swagger.io/) for interactive API documentation, powered by [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction).

- **Access the Swagger UI locally:**  
  [http://localhost:3001/api](http://localhost:3001/api)

- **Features:**
  - View and test all available API endpoints
  - See request/response schemas and error messages
  - Auto-generated from your NestJS controllers and DTOs

### How to Enable/Customize

Swagger is set up in [`src/main.ts`](backend/src/main.ts) and enabled by default for local development.  
You can customize the title, description, and version in the `DocumentBuilder`

---

## Database: Prisma & AWS RDS PostgreSQL

This project uses [Prisma](https://www.prisma.io/) as an ORM for type-safe database access and migrations, connected to a managed PostgreSQL instance on AWS RDS.

- **Prisma:**

  - Database schema is defined in [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma).
  - Prisma Client is generated and used in the NestJS backend for all database operations.
  - Migrations are managed via Prisma CLI (`npx prisma migrate dev` for local, `npx prisma migrate deploy` for production).

- **AWS RDS PostgreSQL:**

  - The backend connects to a PostgreSQL database hosted on AWS RDS.
  - Connection details are provided via the `DATABASE_URL` environment variable, which is securely managed using GitHub Actions secrets and injected during deployment.
  - Example connection string:
    ```
    DATABASE_URL="postgresql://<username>:<password>@<rds-endpoint>:5432/<database>"
    ```

- **Deployment Notes:**

  - The `.env` file containing the database connection string is **not committed** to the repository. It is stored as a GitHub secret and written to the backend during deployment.
  - Prisma Client is generated during the Docker build process to ensure compatibility with the deployed schema.

- **Useful Commands:**
  - Generate Prisma Client:
    ```bash
    npx prisma generate
    ```
  - Run migrations locally:
    ```bash
    npx prisma migrate dev
    ```
  - Apply migrations in production:
    ```bash
    npx prisma migrate deploy
    ```

**See [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma) for models and [`backend/.env`](backend/.env) for environment variable examples.**

---

**For more details, see the workflow in `.github/workflows/deploy.yml`.**
