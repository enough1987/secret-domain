# RTK-Query Fullstack App

This project is a fullstack application with a React frontend (built with Vite), a Node.js/NestJS backend, and AWS infrastructure using S3, CloudFront, and EC2. Deployment is automated via GitHub Actions.

---

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

### 3. EC2 (Elastic Compute Cloud)

- **Purpose:** Runs your backend (Node.js/NestJS) and Nginx as a reverse proxy.
- **Deployment:** Automated via GitHub Actions using SSH and Docker Compose.
- **Nginx:** Listens on port 443 (HTTPS), proxies `/api/` requests to the backend container.
- **Backend:** Dockerized Node.js/NestJS app, listens on port 3001.

### 4. GitHub Actions (CI/CD)

- **Purpose:** Automates deployment for both frontend and backend.
- **Frontend:** Builds and uploads to S3, then invalidates CloudFront cache.
- **Backend:** SSHs into EC2, pulls latest code, and restarts Docker Compose services.

### 5. Security

- **S3:** "Block all public access" is ON. Only CloudFront (via OAC) can read objects.
- **CloudFront:** Handles HTTPS for both frontend and API.
- **EC2:** Only accessible via SSH for deployment and by CloudFront for API requests.

---

## Request Flow

1. **User visits** `https://duv4josean1c1.cloudfront.net`
   - CloudFront serves static files from S3.
2. **User/API calls** `https://duv4josean1c1.cloudfront.net/api/todos`
   - CloudFront routes `/api/*` to EC2’s Nginx, which proxies to the backend container.
3. **All other paths** (e.g., `/`, `/about`, `/static/*`)
   - CloudFront serves from S3 (with SPA routing via CloudFront Function if needed).

---

## Architecture Diagram

```
[User]
   |
   v
[CloudFront Distribution]
   |                \
   v                 v
[S3 Bucket]      [EC2 Instance]
 (Frontend)        (Nginx -> Backend)
```

- **Default behavior (`*`):** S3 Bucket (frontend)
- **API behavior (`/api/*`):** EC2 (Nginx → Backend)

---

## Local Development

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Node.js (for local frontend development)

### Running Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/<your-username>/RTK-Query.git
   cd RTK-Query
   ```

2. **Start backend and Nginx:**

   ```bash
   docker-compose up --build
   ```

3. **Start frontend (in another terminal):**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173) (or as shown in your terminal)
   - API: [http://localhost:3001/api/todos](http://localhost:3001/api/todos)

---

## Environment Variables

- **Frontend:**  
  Set `VITE_API_URL` in `.env.production` to your CloudFront domain (e.g., `https://duv4josean1c1.cloudfront.net/api`).

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
  cd ~/RTK-Query
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

**For more details, see the workflow in `.github/workflows/deploy.yml`.**
