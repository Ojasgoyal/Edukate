import { useEffect, useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { TenantContext } from "../context/TenantContext";
import TenantNavbar from "../components/TenantNavbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useProgress } from "../hooks/useProgress";

export default function TenantHome() {
  const { tenant } = useContext(TenantContext);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";
  const { userData, fetchUser } = useAuth();
  const userId = userData?.user?.id || userData?.user?._id;
  const { getCourseProgress } = useProgress(tenant, userId);

  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoggedIn = !!userData?.user;
  const isStudent = userData?.user?.role === "student";
  const firstName = userData?.user?.name?.split(" ")[0];

  useEffect(() => {
    if (!tenant) return;

    const fetchAllData = async () => {
      try {
        setLoading(true);
        // 1. Fetch all available courses for this tenant
        const coursesRes = await axios.get(`${apiBaseUrl}/api/courses`, {
          headers: { "x-tenant": tenant },
          withCredentials: true,
        });
        setCourses(coursesRes.data.courses);

        // 2. If the user is a logged-in student, fetch their specific enrollments
        if (isLoggedIn && isStudent) {
          try {
            const enrollRes = await axios.get(
              `${apiBaseUrl}/api/enroll/courses`,
              {
                headers: { "x-tenant": tenant },
                withCredentials: true,
              },
            );
            // Store just the IDs of courses they own for easy lookup
            const ids = new Set(enrollRes.data.courses.map((c) => c.id));
            setEnrolledCourseIds(ids);
          } catch (e) {
            console.error("Could not fetch enrolled courses:", e);
          }
        }
      } catch (err) {
        setError(err.response?.status === 404 ? "NO_TENANT" : "GENERIC");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    fetchUser(); // Ensure we have the latest user data broadly
  }, [tenant, apiBaseUrl, isLoggedIn, isStudent]);

  if (error === "NO_TENANT")
    return (
      <div className="h-screen flex items-center justify-center">
        <h2>Educator "{tenant}" not found.</h2>
      </div>
    );
  if (error)
    return (
      <div className="h-screen flex items-center justify-center">
        <h2>Something went wrong loading the classroom.</h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <TenantNavbar />

      <main className="max-w-6xl mx-auto px-6 py-10 mt-6">
        {/* Dynamic Hero Section */}
        <section className="bg-muted/40 rounded-2xl p-10 mb-10 text-center border shadow-sm">
          {isLoggedIn ? (
            <>
              <h1 className="text-4xl font-bold font-dm-serif mb-4 capitalize text-primary">
                Welcome back, {firstName}!
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Ready to continue your journey? Pick up where you left off or
                discover new courses carefully crafted by{" "}
                <span className="capitalize font-semibold">{tenant}</span>.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold font-dm-serif mb-4 capitalize text-primary">
                Welcome to {tenant}'s Classroom
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore our professional courses and take the first step towards
                mastering new skills today.
              </p>
            </>
          )}
        </section>

        {/* Unified Courses Grid */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b pb-2">
            <h2 className="text-2xl font-semibold">
              {isLoggedIn ? "Classroom Courses" : "Available Courses"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Refined Pulse Skeletons
              [1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-85 bg-muted/60 animate-pulse rounded-xl border"
                />
              ))
            ) : courses?.length === 0 ? (
              <p className="text-muted-foreground col-span-full py-10 text-center border border-dashed rounded-xl bg-muted/20">
                No courses available at the moment. Check back later!
              </p>
            ) : (
              courses?.map((course) => {
                const isEnrolled = enrolledCourseIds.has(course._id);

                return (
                  <Link
                    key={course._id}
                    to={`/course/${course.courseSlug}`}
                    className="group flex flex-col bg-card border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300 relative"
                  >
                    <div className="aspect-video bg-muted group-hover:opacity-90 transition-opacity relative">
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover aspect-video"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Image
                        </div>
                      )}

                      {/* Display an 'Enrolled' tag beautifully positioned over the thumbnail */}
                      {isEnrolled && (
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                          Enrolled
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                        {course.description}
                      </p>
                      {isEnrolled && userId && (
                        <div className="mt-2 mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-muted-foreground">
                              Progress
                            </span>
                            <span className="text-xs font-semibold text-primary">
                              {getCourseProgress(course._id)}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-300"
                              style={{
                                width: `${getCourseProgress(course._id)}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="mt-auto pt-4 border-t flex items-center justify-between">
                        <span
                          className={`font-bold text-lg ${isEnrolled ? "text-primary" : ""}`}
                        >
                          {isEnrolled ? "Owned" : `₹${course.price || "Free"}`}
                        </span>

                        <span
                          className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${
                            isEnrolled
                              ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                              : "bg-muted text-foreground group-hover:bg-foreground group-hover:text-background"
                          }`}
                        >
                          {isEnrolled ? "Continue" : "View Details ->"}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
