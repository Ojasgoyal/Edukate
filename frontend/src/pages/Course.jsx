import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TenantContext } from "../context/TenantContext";
import { useAuth } from "../context/AuthContext";
import TenantNavbar from "../components/TenantNavbar";
import Watch from "../components/Courses/Watch";
import axios from "axios";

export default function PublicCourse() {
  const { courseSlug } = useParams();
  const { tenant } = useContext(TenantContext);
  const { userData } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLecture, setActiveLecture] = useState(null);
  
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";

  const fetchCourse = async () => {
    try {
      const res = await axios.get(
        `${apiBaseUrl}/api/courses/course/${courseSlug}`,
        {
          headers: { "x-tenant": tenant },
          withCredentials: true,
        }
      );
      setData(res.data);
    } catch (err) {
      console.error("Course fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tenant && courseSlug) fetchCourse();
    if (!tenant) console.log("tenant not loaded");
  }, [courseSlug, tenant, apiBaseUrl]);

  if (loading) return <div className="p-10 animate-pulse">Loading course...</div>;
  if (!data) return <div className="p-10 text-center">Course not found.</div>;

  const { course, access } = data;

  const handleEnrollClick = async () => {
    if (!userData?.user || userData.user.slug !== tenant) {
      navigate("/login");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${apiBaseUrl}/api/enroll/buy/${course.id}`,
        {},
        { headers: { "x-tenant": tenant }, withCredentials: true }
      );

      if (res.status === 201 || res.status === 200) {
        const refreshedRes = await axios.get(
          `${apiBaseUrl}/api/courses/course/${courseSlug}`,
          { headers: { "x-tenant": tenant }, withCredentials: true }
        );
        setData(refreshedRes.data);
      }
    } catch (error) {
      console.error("Enrollment failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Failed to enroll. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TenantNavbar tenantName={tenant} />

      <main className={`mx-auto pt-24 px-6 pb-20 transition-all duration-500 ease-in-out ${activeLecture ? "max-w-6xl" : "max-w-4xl"}`}>
        
        <div className="border-b pb-8">
          <h1 className="text-4xl font-bold font-dm-serif mb-4">
            {course.title}
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            {course.description}
          </p>

          {!access.isOwner && !access.isEnrolled && (
            <div className="flex gap-10 justify-baseline items-center">
              <button
                onClick={handleEnrollClick}
                className="bg-foreground text-background px-6 py-2 rounded-md font-bold hover:opacity-90 transition-all"
                disabled={loading}
              >
                {course.price > 0 ? `Enroll Now` : "Enroll for Free"}
              </button>
              {course.price > 0 && (
                <div className="text-xl text-center text-foreground font-extrabold">
                  Price: ₹{course.price}
                </div>
              )}
            </div>
          )}

          {access.isOwner && (
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded text-sm font-medium">
              You are the owner of this course
            </div>
          )}
        </div>

        <div className={`py-10 grid gap-8 items-start ${activeLecture ? "lg:grid-cols-3" : "grid-cols-1"}`}>
          
          <div className={`${activeLecture ? "lg:col-span-1 order-2 lg:order-1" : ""}`}>
            <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>

            {access.canViewLectures ? (
              <div className={`space-y-4 ${activeLecture ? "pr-2 max-h-[70vh] overflow-y-auto" : ""}`}>
                {course.lectures?.length > 0 ? (
                  course.lectures.map((lecture, idx) => {
                    const isPlaying = activeLecture?._id === lecture._id || activeLecture?.title === lecture.title; 
                    const hasVideo = !!lecture.videoUrl && lecture.videoUrl.trim() !== "";
                    
                    return (
                      <div
                        key={idx}
                        className={`p-4 border rounded-md flex justify-between items-center transition-all ${
                          isPlaying ? "bg-primary/10 border-primary" : "bg-muted/30"
                        }`}
                      >
                        <span className={`font-medium ${isPlaying ? "text-primary" : ""}`}>
                          {idx + 1}. {lecture.title}
                        </span>
                        
                        <button 
                          onClick={() => {
                            if (!hasVideo) return; // Extra block safety
                            setActiveLecture(lecture);
                            if (!activeLecture) {
                               window.scrollTo({ top: 300, behavior: 'smooth' });
                            }
                          }}
                          disabled={!hasVideo}
                          className={`text-sm font-medium ${
                            !hasVideo 
                              ? "text-muted-foreground opacity-50 cursor-not-allowed" 
                              : isPlaying 
                                ? "text-primary underline" 
                                : "text-muted-foreground hover:text-foreground underline"
                          }`}
                        >
                          {!hasVideo ? "No Video" : isPlaying ? "Playing" : "Watch"}
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <p>No lectures added yet.</p>
                )}
              </div>
            ) : (
              <div className="p-10 border-2 border-dashed rounded-lg text-center bg-muted/10">
                <p className="text-muted-foreground mb-2">
                  Enroll in this course to unlock all lectures and materials.
                </p>
                <p className="text-xs uppercase tracking-widest font-bold">
                  Content Locked
                </p>
              </div>
            )}
          </div>

          {/* Add onClose prop to allow Watch component to clear the active view */}
          {access.canViewLectures && activeLecture && (
            <div className="lg:col-span-2 order-1 lg:order-2 sticky top-24">
              <Watch lecture={activeLecture} onClose={() => setActiveLecture(null)} />
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
