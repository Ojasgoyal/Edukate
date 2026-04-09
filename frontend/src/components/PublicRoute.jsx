import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom"

export default function PublicRoute({ children }) {
  const { userData , loading } = useAuth();

  if (loading) return null; // wait for /me

  if (userData?.user) return <Navigate to="/" replace />;

  return children;
}