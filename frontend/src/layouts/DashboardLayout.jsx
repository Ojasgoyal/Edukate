import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function DashboardLayout() {
  const { setUser } = useAuth();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const handleLogout = async () => {
    await axios.post(
      `${apiBaseUrl}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    setUser(null);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-54 bg-gray-100 p-4 space-y-4">
        <h2 className="text-xl font-bold">Edukate</h2>

        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className="hover:bg-gray-200 p-2 rounded">
            Dashboard
          </Link>

          <Link
            to="/dashboard/courses"
            className="hover:bg-gray-200 p-2 rounded"
          >
            Courses
          </Link>

          <Link
            to="/dashboard/courses/new"
            className="hover:bg-gray-200 p-2 rounded"
          >
            Create Course
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="hover:bg-gray-200 p-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
