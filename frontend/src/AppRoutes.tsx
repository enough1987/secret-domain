import React from 'react'
import { Routes, Route } from "react-router";
import Photos from './views/photos/Photos'
import App from './App';
import Home from './views/home/Home';
import Todos from './views/todos/Todos';

const AppRoutes: React.FC = () => (
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/todos/:type" element={<Todos />} />
        <Route path="/photos" element={<Photos />} />
      </Route>
    </Routes>
)

export default AppRoutes