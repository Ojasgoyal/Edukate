import { Link } from "react-router-dom";
import { SwatchBook } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function TenantNavbar({ tenantName }) {
  // We'll check for 'student' auth here later
  const { userData } = useAuth();

  const { user, tenant, isDemo } = userData;

  const isStudent = user?.role === "student" && tenant === tenantName;

  return (
    <nav className="fixed top-0 w-full h-16 bg-background border-b z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <SwatchBook className="text-primary" />
        <span className="text-xl font-bold font-dm-serif capitalize">
          {tenantName}
        </span>
      </div>
      {!isDemo && (
        <div className="flex gap-4 items-center">
          <Link
            to={isStudent ? "/mycourses" : "/login"}
            className="bg-foreground text-background px-4 py-2 rounded-sm text-sm font-medium"
          >
            {isStudent ? "My Courses" : "Student Login"}
          </Link>
        </div>
      )}
    </nav>
  );
}
