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

  const {
    data: courses,
    error,
    isLoading,
  } = useSWR(`${apiBaseUrl}/api/courses/mycourses`, fetcher);

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
                className="w-64 h-48 bg-muted/60 animate-pulse rounded-sm flex flex-col justify-end p-4 gap-2 mr-4"
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
                // 1. Changed w-fit to w-64 here
                className="w-64 h-fit bg-background/80 shadow border border-px border-chart-1 rounded-sm flex flex-col justify-start gap-2 transition-transform hover:scale-102"
                key={course._id}
                to={`/dashboard/courses/edit/${course.courseSlug}`}
              >
                <img
                  // You can change this to w-full since the parent is now w-64
                  className="w-full object-cover rounded-t-sm"
                  src={course.thumbnail}
                  alt={course.title}
                />

                {/* Added gap-2 so text doesn't touch the price */}
                <div className="flex h-fit justify-between pt-1 pb-5 px-4 gap-2">
                  {/* 2. Added flex-1 and min-w-0 here to allow text truncation */}
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className="text-xl font-semibold truncate">
                      {course.title}
                    </div>
                    {/* 3. Removed truncate, kept line-clamp-2 */}
                    <div className="text-sm line-clamp-2 text-muted-foreground">
                      {course.description}
                    </div>
                  </div>

                  {/* 4. Added shrink-0 so the price doesn't get squeezed */}
                  <div className="font-semibold text-md pr-2 shrink-0">₹{course.price}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
