import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import { TenantContext } from "../context/TenantContext";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children, mode = "default" }) {
  const { userData, loading } = useAuth();
  const { tenant: currentTenant } = useContext(TenantContext);

  if (loading) return null;

  const user = userData?.user;
  const responseTenant = userData?.user?.slug;
  const isDemo = userData?.isDemo;

  // 🔥 ROOT LOGIC (edukate.in)
  if (mode === "root") {
    if (user) return <Navigate to="/dashboard" replace />;
  }

  // 🔥 TENANT LOGIC (abc.edukate.in)
  if (mode === "tenant") {
    const isStudentOnSameTenant =
      user?.role === "student" && responseTenant === currentTenant;

    const isTeacherOnOwnTenant =
      user?.role === "teacher" && currentTenant === responseTenant;

    // 🚫 block login page
    if (isStudentOnSameTenant || isTeacherOnOwnTenant) {
      return <Navigate to="/" replace />;
    }

    // ✅ allow everyone else
  }

  return children;
}