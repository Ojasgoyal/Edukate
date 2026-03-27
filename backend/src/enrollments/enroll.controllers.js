import User from "../models/User.js";
import Enrollments from "../models/Enrollments.js";
import Course from "../models/Course.js";

export const getEnrollments = async (req, res) => {
  try {
    const tenant = req.tenant;
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.teacherId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized access to this course",
      });
    }

    const enrollments = await Enrollments.find({ courseId })
      .populate("studentId", "name email") // only required fields
      .select("studentId createdAt");

    if (!enrollments) {
      return res.status(404).json({ message: "no enrollments" });
    }

    const students = enrollments.map((e) => ({
      id: e.studentId._id,
      name: e.studentId.name,
      email: e.studentId.email,
      enrolledAt: e.createdAt,
    }));

    return res.status(200).json({
      count: students.length,
      students,
    });

    return res.status(200).json(enrolls);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};

export const getCourses = async (req, res) => {
  try {
    const studentId = req.user.id;
    const tenant = req.tenant;

    const enrollments = await Enrollments.find({ studentId, tenant })
      .populate({
        path: "courseId",
        select: "title description courseSlug isPublished tenant", // only needed fields
      })
      .select("courseId createdAt");

    const courses = enrollments
      .filter((e) => e.courseId && e.courseId.isPublished)
      .map((e) => ({
        id: e.courseId._id,
        title: e.courseId.title,
        description: e.courseId.description,
        slug: e.courseId.courseSlug,
        enrolledAt: e.createdAt,
      }));

    return res.status(200).json({
      count: courses.length,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};

export const enroll = async (req, res) => {
  try {
    const studentId = req.user.id;
    const tenant = req.tenant;
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID required" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.tenant !== tenant) {
      return res.status(403).json({
        message: "Invalid tenant for this course",
      });
    }

    if (!course.isPublished) {
      return res.status(403).json({
        message: "Course not available for enrollment",
      });
    }

    const user = await User.findById(studentId).select("role");

    if (!user || user.role !== "student") {
      return res.status(403).json({
        message: "Only students can enroll",
      });
    }

    const existing = await Enrollments.findOne({
      studentId,
      courseId,
    });

    if (existing) {
      return res.status(200).json({
        message: "Already enrolled",
      });
    }

    const enrollment = await Enrollments.create({
      studentId,
      courseId,
      tenant,
    });

    return res.status(201).json({
      message: "Enrollment successful",
      enrollmentId: enrollment._id,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(200).json({
        message: "Already enrolled",
      });
    }

    return res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};
