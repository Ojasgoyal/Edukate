import { Link } from "react-router-dom";
import { SwatchBook } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import { TenantContext } from "../context/TenantContext";

export default function TenantNavbar() {
  // Grab the global loading state from AuthContext instead of local state
  const { userData, loading } = useAuth();
  const tenant = useContext(TenantContext)?.tenant;

  const user = userData?.user;
  const responseTenant = userData?.user?.slug;
  const isDemo = user?.role === "teacher" && tenant === responseTenant;

  const isStudent = user?.role === "student" && tenant === user?.slug;

  return (
    <nav className="fixed top-0 w-full h-16 bg-background border-b z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <SwatchBook className="text-primary" />
        <span className="text-xl font-bold font-dm-serif capitalize">
          {tenant}
        </span>
      </div>

      {/* Wait to render the buttons until auth loading is finished */}
      {!loading &&
        (!isDemo ? (
          <div className="flex gap-4 items-center">
            <Link
              to={isStudent ? "/mycourses" : "/login"}
              className="bg-foreground text-background px-4 py-2 rounded-sm text-sm font-medium"
            >
              {isStudent ? "My Courses" : "Student Login"}
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <span className="text-sm font-medium">Demo Mode</span>
          </div>
        ))}
    </nav>
  );
}
