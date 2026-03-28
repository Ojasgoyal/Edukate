import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom"

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // wait for /me

  if (user) return <Navigate to="/dashboard" replace />;

  return children;
}