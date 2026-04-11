import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateCourse() {
  const apibaseurl = import.meta.env.VITE_APP_API_BASE_URL ?? "";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
  });
  const [loading, setLoading] = useState(false);
  
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${apibaseurl}/api/courses/create`,
        { ...formData, lectures: [] },
        { withCredentials: true }
      );
      
      showToast("Course created successfully! Redirecting...", "success");
      
      setTimeout(() => {
        navigate(`/dashboard/courses/edit/${formData.slug}`);
      }, 1500);

    } catch (err) {
      showToast(err.response?.data?.message || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white border shadow-sm rounded-lg relative">
      <h2 className="text-2xl font-bold mb-6">Create New Course</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Course Title</label>
          <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g. Advanced Mathematics" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Course Slug</label>
          <input type="text" name="slug" required value={formData.slug} onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g. basic-math" />
          <p className="text-xs text-gray-500 mt-1">This will be used in the URL: /course/basic-math</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="What is this course about?"></textarea>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-foreground text-background font-semibold py-2 rounded hover:opacity-90 disabled:opacity-50">
          {loading ? "Creating..." : "Create Course"}
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
