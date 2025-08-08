# RTK-Query

A demo React application using Redux Toolkit Query (RTK Query) for efficient data fetching, caching, and state management.  
This project showcases CRUD operations for todos and photos, integration with a mock REST API (nestjs + postgres), and modern UI with SCSS.

## Features

- Fetch, add, update, and delete todos
- Filter todos by completion status
- View and manage photos
- Uses RTK Query for API calls and caching
- Styled with SCSS
- Mock backend with json-server

## Tech Stack

- React
- Redux Toolkit & RTK Query
- TypeScript

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up the backend:

   - For local development, ensure your backend (NestJS + Postgres) is running and accessible. By default, the frontend expects the API at `http://localhost:3001`.
   - For production, set the `VITE_API_URL` environment variable to your deployed backend URL before building:
     ```bash
     VITE_API_URL=https://your-backend-url npm run build
     ```

3. Start the React app (development mode):

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Production Build & Deployment

To build the app for production:

```bash
VITE_API_URL=https://your-backend-url npm run build
```

The static files will be output to the `dist/` directory. You can deploy these to any static hosting service (S3, Vercel, Netlify, etc.).

## Environment Variables

- `VITE_API_URL` — The base URL for the backend API. Set this before building for production.

## Notes

- The app uses RTK Query for all API interactions and caching.
- The backend is a NestJS app with a Postgres database (see `/backend`).
- For local development, you can run both frontend and backend on your machine.
- For production, the recommended deployment is:
  - Backend: Docker + AWS (see backend/README.md)
  - Frontend: Static build deployed to S3 + CloudFront
