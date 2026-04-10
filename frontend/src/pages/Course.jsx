import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TenantContext } from "../context/TenantContext";
import { useAuth } from "../context/AuthContext";
import TenantNavbar from "../components/TenantNavbar";
import axios from "axios";

export default function PublicCourse() {
  const { courseSlug } = useParams();
  const { tenant } = useContext(TenantContext);
  const { userData } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";
  
  useEffect(() => {
    const fetchCourse = async () => {
      
      try {
        const res = await axios.get(`${apiBaseUrl}/api/courses/course/${courseSlug}`, {
          headers: { "x-tenant": tenant },
          withCredentials: true,
        });
        setData(res.data);
      } catch (err) {
        console.error("Course fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    if (tenant && courseSlug) fetchCourse();
    if(!tenant) console.log("tenant not loaded"); // Stop loading if tenant is not available
  }, [courseSlug, tenant, apiBaseUrl]);

  if (loading) return <div className="p-10 animate-pulse">Loading course...</div>;
  if (!data) return <div className="p-10 text-center">Course not found.</div>;

  const { course, access } = data;

  const handleEnrollClick = () => {
    if (!userData?.user || userData.user.slug !== tenant) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      console.log("Proceed to checkout/enrollment logic");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TenantNavbar tenantName={tenant} />
      
      <main className="max-w-4xl mx-auto pt-24 px-6">
        {/* Course Header */}
        <div className="border-b pb-8">
          <h1 className="text-4xl font-bold font-dm-serif mb-4">{course.title}</h1>
          <p className="text-muted-foreground text-lg mb-6">{course.description}</p>
          
          {/* Action Buttons based on Access */}
          {!access.isOwner && !access.isEnrolled && (
            <button 
              onClick={handleEnrollClick}
              className="bg-foreground text-background px-8 py-3 rounded-md font-bold hover:opacity-90 transition-all"
            >
              Enroll Now
            </button>
          )}

          {access.isOwner && (
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded text-sm font-medium">
              You are the owner of this course
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="py-10">
          <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
          
          {access.canViewLectures ? (
            <div className="space-y-4">
              {course.lectures?.length > 0 ? (
                course.lectures.map((lecture, idx) => (
                  <div key={idx} className="p-4 border rounded-md flex justify-between items-center bg-muted/30">
                    <span className="font-medium">{idx + 1}. {lecture.title}</span>
                    <button className="text-sm text-primary underline">Watch</button>
                  </div>
                ))
              ) : (
                <p>No lectures added yet.</p>
              )}
            </div>
          ) : (
            <div className="p-10 border-2 border-dashed rounded-lg text-center bg-muted/10">
              <p className="text-muted-foreground mb-2">Enroll in this course to unlock all lectures and materials.</p>
              <p className="text-xs uppercase tracking-widest font-bold">Content Locked</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}