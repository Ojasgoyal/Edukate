// routes/TenantRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Course from "../pages/Course";
import TenantHome from "../pages/TenantHome";
// import NotFound from "../pages/NotFound";

export default function TenantRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TenantHome />} />
      <Route path="/course/:courseSlug" element={<Course />} />

      {/* catch invalid routes */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}