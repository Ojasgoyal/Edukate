// routes/TenantRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Course from "../pages/Course";
import TenantHome from "../pages/TenantHome";
import Studentlogin from "../pages/Studentlogin";

import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
// import NotFound from "../pages/NotFound";

export default function TenantRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TenantHome />} />
      <Route path="/course/:courseSlug" element={<Course />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Studentlogin />
          </PublicRoute>
        }
      />

      {/* catch invalid routes */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
