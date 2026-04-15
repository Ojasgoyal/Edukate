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

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

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
      const { data } = await axios.get(
        `${apibaseurl}/api/courses/edit/${slug}`,
        { withCredentials: true },
      );
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
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLectureChange = (secIndex, lecIndex, field, value) => {
    const updatedSections = [...course.sections];
    updatedSections[secIndex].lectures[lecIndex][field] = value;
    setCourse({ ...course, sections: updatedSections });
  };

  const addSection = () => {
    setCourse({
      ...course,
      sections: [
        ...(course.sections || []),
        { title: "New Section", lectures: [] },
      ],
    });
  };

  const handleSectionChange = (secIndex, value) => {
    const updatedSections = [...course.sections];
    updatedSections[secIndex].title = value;
    setCourse({ ...course, sections: updatedSections });
  };

  const removeSection = (secIndex) => {
    const updatedSections = course.sections.filter((_, i) => i !== secIndex);
    setCourse({ ...course, sections: updatedSections });
  };

  const addLecture = (secIndex) => {
    const updatedSections = [...course.sections];
    updatedSections[secIndex].lectures.push({ title: "", videoUrl: "" });
    setCourse({ ...course, sections: updatedSections });
  };

  const removeLecture = (secIndex, lecIndex) => {
    const updatedSections = [...course.sections];
    updatedSections[secIndex].lectures = updatedSections[
      secIndex
    ].lectures.filter((_, i) => i !== lecIndex);
    setCourse({ ...course, sections: updatedSections });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${apibaseurl}/api/courses/edit/${slug}`, course, {
        withCredentials: true,
      });
      showToast("Course updated successfully!", "success");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to update course.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this course? This cannot be undone.",
      )
    )
      return;
    try {
      await axios.delete(`${apibaseurl}/api/courses/delete/${slug}`, {
        withCredentials: true,
      });
      navigate("/dashboard/courses");
    } catch (err) {
      showToast("Failed to delete course.", "error");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!course) return <div>Course not found</div>;

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
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

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600"
          >
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
              <input
                type="text"
                name="title"
                value={course.title}
                onChange={handleDetailsChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Add Price Input */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium mb-1">
                Price (₹)
              </label>
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
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              value={course.description}
              onChange={handleDetailsChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={course.isPublished}
              onChange={handleDetailsChange}
              className="w-4 h-4"
            />
            <label htmlFor="isPublished" className="text-sm font-medium">
              Publish Course (Make visible to students)
            </label>
          </div>
        </div>

        {/* Lectures / Curriculum Section */}
        <div className="bg-white p-6 border shadow-sm rounded-lg space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold">Course Curriculum</h3>
            <button
              type="button"
              onClick={addSection}
              className="bg-foreground text-background px-3 py-1 rounded text-sm hover:bg-foreground/80"
            >
              + Add Section
            </button>
          </div>

          <div className="space-y-6">
            {!course.sections || course.sections.length === 0 ? (
              <p className="text-gray-500 text-sm italic">
                No sections added yet. Add a section to start building your
                course.
              </p>
            ) : (
              course.sections.map((section, secIndex) => (
                <div
                  key={secIndex}
                  className="border border-foreground/20 rounded-md p-4 bg-gray-50/50"
                >
                  {/* Section Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 mr-4">
                      <input
                        type="text"
                        placeholder="Section Title"
                        value={section.title}
                        onChange={(e) =>
                          handleSectionChange(secIndex, e.target.value)
                        }
                        className="w-full text-lg font-bold bg-transparent border-b border-dashed border-gray-400 focus:border-foreground outline-none pb-1"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSection(secIndex)}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      Delete Section
                    </button>
                  </div>

                  {/* Lectures nested inside Section */}
                  <div className="border-gray-200">
                    {/* Add inline scroll specifically for lectures here */}
                    <div className="max-h-90 overflow-y-auto pr-2 space-y-3">
                      {!section.lectures || section.lectures.length === 0 ? (
                        <p className="text-xs text-gray-400">
                          No lectures in this section.
                        </p>
                      ) : (
                        section.lectures.map((lecture, lecIndex) => (
                          <div
                            key={lecIndex}
                            className="flex gap-4 items-start p-3 border rounded bg-white shadow-sm"
                          >
                            <div className="flex-1 space-y-2">
                              <input
                                type="text"
                                placeholder="Lecture Title"
                                value={lecture.title}
                                onChange={(e) =>
                                  handleLectureChange(
                                    secIndex,
                                    lecIndex,
                                    "title",
                                    e.target.value,
                                  )
                                }
                                className="w-full p-2 border rounded text-sm"
                                required
                              />
                              <input
                                type="url"
                                placeholder="YouTube Video URL"
                                value={lecture.videoUrl || ""}
                                onChange={(e) =>
                                  handleLectureChange(
                                    secIndex,
                                    lecIndex,
                                    "videoUrl",
                                    e.target.value,
                                  )
                                }
                                className="w-full p-2 border rounded text-sm text-gray-600"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeLecture(secIndex, lecIndex)}
                              className="text-gray-400 hover:text-red-500 font-bold p-2"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => addLecture(secIndex)}
                      className="text-sm font-medium text-foreground/70 hover:text-foreground mt-4 block"
                    >
                      + Add Lecture
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-foreground text-white font-bold py-3 rounded hover:bg-foreground/80 disabled:opacity-50"
        >
          {saving ? "Saving Changes..." : "Save All Changes"}
        </button>
      </form>

      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-4 rounded shadow-lg text-white font-medium z-50 transition-all ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
