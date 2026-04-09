import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const { userData , loading } = useAuth();

  if (loading) return null;

  if (!userData?.user) return <Navigate to="/login" replace />;

  return children;
}
