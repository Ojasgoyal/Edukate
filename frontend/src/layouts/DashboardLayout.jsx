import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SwatchBook } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current path
  const [logoutLoading, setLogoutLoading] = useState(false);
  
  const currentStyles = "bg-foreground text-background transition-colors duration-300";

  const handleLogout = async () => {
    setLogoutLoading(true);
    await logout();
    navigate("/login", { replace: true });
  };

  // Derive active states from the URL
  const path = location.pathname;
  const isDashboard = path === "/dashboard" || path === "/dashboard/";
  const isCreateCourse = path === "/dashboard/courses/new" || path === "/dashboard/courses/new/";
  // Apply "Courses" tab active state if in courses list OR editing a course
  const isCourses = path.startsWith("/dashboard/courses") && !isCreateCourse;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-36 md:w-54 bg-background border shadow-lg rounded-sm p-4 space-y-10">
        <Link to="/" className="flex pt-2 pl-2 gap-1 items-center h-fit">
          <SwatchBook />
          <h2 className="text-2xl font-dm-serif font-bold">edukate</h2>
        </Link>
        <div className="flex flex-col justify-between h-100 text-sm font-semibold">
          <nav className="flex flex-col gap-2">
            <Link
              to="/dashboard"
              className={`p-2 rounded ${isDashboard ? currentStyles : "hover:bg-gray-200"}`}
            >
              Dashboard
            </Link>

            <Link
              to="/dashboard/courses"
              className={`p-2 rounded ${isCourses ? currentStyles : "hover:bg-gray-200"}`}
            >
              Courses
            </Link>

            <Link
              to="/dashboard/courses/new"
              className={`p-2 rounded ${isCreateCourse ? currentStyles : "hover:bg-gray-200"}`}
            >
              Create Course
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className={`hover:bg-gray-200 p-2 rounded text-left mt-auto`}
            disabled={logoutLoading}
          >
            {logoutLoading ? "Logging out..." : "Logout"}
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
