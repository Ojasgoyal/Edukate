import { useEffect, useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { TenantContext } from "../context/TenantContext";
import TenantNavbar from "../components/TenantNavbar";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TenantHome() {
  const { tenant } = useContext(TenantContext);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tenant) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/courses`, {
          headers: { "x-tenant": tenant },
          withCredentials: true,
        });
        setCourses(response.data.courses);
      } catch (err) {
        setError(err.response?.status === 404 ? "NO_TENANT" : "GENERIC");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tenant, apiBaseUrl]);

  if (error === "NO_TENANT") return <div className="h-screen flex items-center justify-center"><h2>Educator "{tenant}" not found.</h2></div>;
  if (error) return <div className="h-screen flex items-center justify-center"><h2>Something went wrong.</h2></div>;

  return (
    <div className="min-h-screen bg-background">
      <TenantNavbar tenantName={tenant} />

      <main className="max-w-6xl mx-auto pt-24 px-6">
        {/* Hero Section */}
        <section className="py-12 border-b mb-10">
          <h1 className="text-4xl font-bold font-dm-serif mb-4 capitalize">
            Welcome to {tenant}'s Classroom
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore our professional courses and start your learning journey today.
          </p>
        </section>

        {/* Courses Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Pulse Skeletons
              [1, 2, 3].map((n) => (
                <div key={n} className="h-64 bg-muted animate-pulse rounded-lg" />
              ))
            ) : courses?.length === 0 ? (
              <p className="text-muted-foreground">No courses available at the moment.</p>
            ) : (
              courses?.map((course) => (
                <Link 
                  key={course._id} 
                  to={`/course/${course.courseSlug}`}
                  className="group border rounded-lg overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="aspect-video bg-muted group-hover:opacity-90 transition-opacity" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-bold text-lg">₹{course.price || "Free"}</span>
                      <span className="text-xs bg-muted px-2 py-1 rounded">View Details</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}