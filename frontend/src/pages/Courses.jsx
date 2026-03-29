import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import useSWR from "swr";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const fetcher = async (url) => {
  const response = await axios.get(url, { withCredentials: true });
  return response.data?.courses || [];
};

export default function Courses() {
  const { user } = useAuth();

  const { data: courses, error, isLoading } = useSWR(
    `${apiBaseUrl}/api/courses/mycourses`,
    fetcher
  );

  return (
    <>
      <div className="my-5 text-xl font-bold">Courses By Me</div>
      <div className="">
        {isLoading ? (
          // 👇 The Skeleton Loader
          <div className="flex">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                // Matches your card size, adds a pulse animation and a soft background
                className="w-52 h-32 bg-muted/60 animate-pulse rounded-sm flex flex-col justify-end p-4 gap-2 mr-4"
              >
                {/* Fake Title Line */}
                <div className="h-4 bg-muted-foreground/20 rounded w-2/3"></div>
                {/* Fake Description Line */}
                <div className="h-3 bg-muted-foreground/20 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">Failed to load courses.</p>
        ) : courses?.length === 0 ? (
          <p>You have not created any courses yet.</p>
        ) : (
          <div className="flex">
            {courses.map((course) => (
              <Link
                className="w-52 h-32 bg-muted rounded-sm flex flex-col justify-end p-4 gap-2 mr-4 transition-transform hover:scale-105"
                key={course._id}
                to={`/courses/${course.courseSlug}`}
              >
                <div className="font-medium truncate">Course: {course.title}</div>
                <div className="text-sm line-clamp-2">Description: {course.description}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}