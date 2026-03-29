import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { SwatchBook } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout() {
  const [tab, setTab] = useState("dashboard");
  const current =
    "bg-foreground text-background transition-colors duration-300";

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const handleLogout = async () => {
    await axios.post(
      `${apiBaseUrl}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-54 bg-background border shadow-lg rounded-sm p-4 space-y-10">
        <Link to="/" className="flex pt-2 pl-2 gap-1 items-center h-fit">
          <SwatchBook />
          <h2 className="text-2xl font-dm-serif font-bold">edukate</h2>
        </Link>
        <div className="flex flex-col justify-between h-100 text-sm font-semibold">
          <nav className="flex flex-col gap-2">
            <Link
              to="/dashboard"
              className={`p-2 rounded ${tab === "dashboard" ? current : "hover:bg-gray-200"}`}
              onClick={() => setTab("dashboard")}
            >
              Dashboard
            </Link>

            <Link
              to="/dashboard/courses"
              className={`p-2 rounded ${tab === "Courses" ? current : "hover:bg-gray-200"}`}
              onClick={() => setTab("Courses")}
            >
              Courses
            </Link>

            <Link
              to="/dashboard/courses/new"
              className={`p-2 rounded ${tab === "Create Course" ? current : "hover:bg-gray-200"}`}
              onClick={() => setTab("Create Course")}
            >
              Create Course
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="hover:bg-gray-200 p-2 rounded text-left"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
