import React, { Suspense } from 'react'
import { Routes, Route } from "react-router";
import App from './app';

// Lazy load views for code splitting
const Home = React.lazy(() => import('./views/home/home'));
const Todos = React.lazy(() => import('./views/todos/todos'));
const Photos = React.lazy(() => import('./views/photos/photos'));

const AppRoutes: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/todos/:type" element={<Todos />} />
        <Route path="/photos" element={<Photos />} />
      </Route>
    </Routes>
  </Suspense>
)

export default AppRoutes