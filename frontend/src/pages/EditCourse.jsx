// frontend/src/pages/EditCourse.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowUpRight } from "lucide-react"; 

export default function EditCourse() {
  const apibaseurl = import.meta.env.VITE_API_BASE_URL ?? ""; 
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  useEffect(() => {
    fetchCourse();
  }, [slug]);

  const fetchCourse = async () => {
    try {
      const { data } = await axios.get(`${apibaseurl}/api/courses/edit/${slug}`, { withCredentials: true });
      setCourse(data.course);
    } catch (err) {
      showToast("Failed to load course details.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse({
      ...course,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleLectureChange = (index, field, value) => {
    const updatedLectures = [...course.lectures];
    updatedLectures[index][field] = value;
    setCourse({ ...course, lectures: updatedLectures });
  };

  const addLecture = () => {
    setCourse({
      ...course,
      lectures: [...course.lectures, { title: "", videoUrl: "" }]
    });
  };

  const removeLecture = (index) => {
    const updatedLectures = course.lectures.filter((_, i) => i !== index);
    setCourse({ ...course, lectures: updatedLectures });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${apibaseurl}/api/courses/edit/${slug}`, course, { withCredentials: true });
      showToast("Course updated successfully!", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to update course.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this course? This cannot be undone.")) return;
    try {
      await axios.delete(`${apibaseurl}/api/courses/delete/${slug}`, { withCredentials: true });
      navigate("/dashboard/courses");
    } catch (err) {
      showToast("Failed to delete course.", "error");
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!course) return <div>Course not found</div>;

  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const baseDomain = isLocalhost ? "localhost:5173" : "edukate.in";
  const protocol = isLocalhost ? "http://" : "https://";
  
  const publicCourseUrl = `${protocol}${course.tenant}.${baseDomain}/course/${course.courseSlug}`;

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Edit Course: {course.title}</h2>
        
        <div className="flex items-center gap-3">
          <a 
            href={publicCourseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-secondary text-secondary-foreground border px-4 py-2 rounded text-sm hover:bg-gray-100 transition-colors"
          >
            View
            <ArrowUpRight size={16} />
          </a>

          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600">
            Delete Course
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Details Section */}
        <div className="bg-white p-6 border shadow-sm rounded-lg space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Basic Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input type="text" name="title" value={course.title} onChange={handleDetailsChange} className="w-full p-2 border rounded" required />
            </div>

            {/* Add Price Input */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input 
                type="number" 
                name="price" 
                min="0" 
                value={course.price || 0} 
                onChange={handleDetailsChange} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" rows="3" value={course.description} onChange={handleDetailsChange} className="w-full p-2 border rounded" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isPublished" name="isPublished" checked={course.isPublished} onChange={handleDetailsChange} className="w-4 h-4" />
            <label htmlFor="isPublished" className="text-sm font-medium">Publish Course (Make visible to students)</label>
          </div>
        </div>

        {/* Lectures / Curriculum Section */}
        <div className="bg-white p-6 border shadow-sm rounded-lg space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold">Lectures (YouTube Links)</h3>
            <button type="button" onClick={addLecture} className="bg-foreground text-background px-3 py-1 rounded text-sm hover:bg-foreground/80">
              + Add Lecture
            </button>
          </div>

          {course.lectures.length === 0 ? (
            <p className="text-gray-500 text-sm">No lectures added yet.</p>
          ) : (
            <div className="space-y-4">
              {course.lectures.map((lecture, index) => (
                <div key={index} className="flex gap-4 items-start p-4 border rounded bg-gray-50">
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      placeholder="Lecture Title"
                      value={lecture.title}
                      onChange={(e) => handleLectureChange(index, "title", e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                    <input
                      type="url"
                      placeholder="YouTube Video URL"
                      value={lecture.videoUrl || ""}
                      onChange={(e) => handleLectureChange(index, "videoUrl", e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                  <button type="button" onClick={() => removeLecture(index)} className="text-red-500 hover:text-red-700 font-bold p-2">
                    -
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" disabled={saving} className="w-full bg-foreground text-white font-bold py-3 rounded hover:bg-foreground/80 disabled:opacity-50">
          {saving ? "Saving Changes..." : "Save All Changes"}
        </button>
      </form>

      {toast.show && (
        <div className={`fixed bottom-6 right-6 px-6 py-4 rounded shadow-lg text-white font-medium z-50 transition-all ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}