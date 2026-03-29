import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Courses() {
  const { user } = useAuth();
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const [courses, setCourses] = useState([]);
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/courses/mycourses`,
          {
            withCredentials: true,
          },
        );
        setCourses(response.data?.courses);
        setLoading(false);
        console.log("Fetched courses:", response.data?.courses);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching courses:", error);
      }
    };
    
    fetchCourses();
  }, []);

  return (
    <>
      <div className="my-5 text-xl font-bold">Courses By Me</div>
      <div className="">
        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length === 0 ? (
          <p>You have not created any courses yet.</p>
        ) : (
          <div className="flex">
            {courses.map((course) => (
              <Link
                className="w-50 h-30 bg-muted rounded-sm flex flex-col justify-end p-4 gap-2 mr-4"
                key={course._id}
                to={`/courses/${course.courseSlug}`}
              >
                <div className="font-medium">Course: {course.title}</div>
                <div className="text-sm">Description: {course.description}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
