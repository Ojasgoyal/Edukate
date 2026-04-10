import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const { userData } = useAuth();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCourseId, setFilterCourseId] = useState("ALL");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/enroll/tenant-enrollments`, {
          withCredentials: true,
        });
        setEnrollments(res.data.enrollments);
      } catch (error) {
        console.error("Failed to fetch enrollments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, [apiBaseUrl]);

  // Extract unique courses for the filter dropdown
  const uniqueCourses = Array.from(
    new Map(enrollments.map((e) => [e.courseId, e.courseTitle])).entries()
  ).map(([id, title]) => ({ id, title }));

  const filteredEnrollments =
    filterCourseId === "ALL"
      ? enrollments
      : enrollments.filter((e) => e.courseId === filterCourseId);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-dm-serif capitalize">
          {userData?.user?.slug}'s Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">Review your recent student enrollments.</p>
      </header>

      <section className="bg-background border shadow-sm rounded-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Recent Enrollments</h2>
          
          {/* Shadcn-like Select Filter */}
          <select
            value={filterCourseId}
            onChange={(e) => setFilterCourseId(e.target.value)}
            className="px-3 py-2 border rounded-sm bg-background text-sm focus:outline-none focus:ring-1 focus:ring-foreground/50"
          >
            <option value="ALL">All Courses</option>
            {uniqueCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="h-40 flex items-center justify-center animate-pulse text-muted-foreground">
            Loading recent enrollments...
          </div>
        ) : filteredEnrollments.length === 0 ? (
          <div className="text-center py-10 border border-dashed rounded-sm bg-muted/10 text-muted-foreground">
            No enrollments found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="p-3 font-semibold">Student Name</th>
                  <th className="p-3 font-semibold">Email</th>
                  <th className="p-3 font-semibold">Course</th>
                  <th className="p-3 font-semibold">Enrolled Date</th>
                </tr>
              </thead>
              <tbody className="divide-y text-muted-foreground">
                {filteredEnrollments.map((e) => (
                  <tr key={e.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 text-foreground font-medium">{e.studentName}</td>
                    <td className="p-3">{e.studentEmail}</td>
                    <td className="p-3">
                      <span className="bg-muted px-2 py-1 rounded-sm text-xs font-medium text-foreground">
                        {e.courseTitle}
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(e.enrolledAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}