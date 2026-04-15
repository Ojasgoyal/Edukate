import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import useSWR from "swr";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";

const fetcher = async (url) => {
  const response = await axios.get(url, { withCredentials: true });
  return response.data?.courses || [];
};

export default function Courses() {
  const { userData } = useAuth();

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
          <div className="flex gap-4 flex-wrap">
            {courses.map((course) => (
              <Link
                className="w-fit h-fit bg-background/80 shadow border border-px border-chart-1 rounded-sm flex flex-col justify-center px-6 py-8 gap-2 transition-transform hover:scale-102"
                key={course._id}
                to={`/dashboard/courses/edit/${course.courseSlug}`}
              >
                <div>
                  <img className="w-64 object-cover rounded-sm " src={course.thumbnail} alt={course.title} />
                </div>
                <div className="text-xl font-semibold truncate">{course.title}</div>
                <div className="text-sm truncate line-clamp-2">{course.description}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}