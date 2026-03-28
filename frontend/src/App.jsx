import React from 'react'
import { Route , Routes } from 'react-router-dom'
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";
import Landing from './pages/Landing';
import Login from './pages/Login';

import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute'


export default function App() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/new" element={<CreateCourse />} />
      </Route>
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />

      {/* Public Course Page */}
      <Route path="/course/:slug" element={<Course />} />
    </Routes>
  )
}
