import Course from "../models/course.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, slug, lectures } = req.body;
    const teacherId = req.user.id;
    const teacherSlug = req.user.slug.toLowerCase().trim();

    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }

    const courseExists = await Course.findOne({
      slug: slug.toLowerCase().trim(),
      teacherSlug,
    });
    if (courseExists) {
      return res
        .status(400)
        .json({ message: "Course slug must be unique for the teacher." });
    }

    const course = await Course.create({
      title,
      description,
      slug: slug.toLowerCase().trim(),
      lectures,
      teacherId,
      teacherSlug,
      isPublished: false,
    });

    res
      .status(201)
      .json({ message: `New Course ${course.title} created successfully` });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Course slug must be unique for the teacher." });
    }
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacherId: req.user.id }).select(
      "-lectures",
    );

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getCourse = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();

    const course = await Course.findOne({ slug, teacherId: req.user.id });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();
    const course = await Course.findOne({
      slug,
      teacherId: req.user.id,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const allowedFields = ["title", "description", "lectures", "isPublished"];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        course[field] = req.body[field];
      }
    });
    await course.save();

    res
      .status(200)
      .json({ message: `Course ${course.title} updated successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();

    const course = await Course.findOneAndDelete({
      slug,
      teacherId: req.user.id,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const teacherSlug = req.headers["x-tenant"]?.toLowerCase().trim();

    if (!teacherSlug) {
      return res.status(400).json({ message: "Tenant required" });
    }

    const courses = await Course.find({
      teacherSlug,
      isPublished: true,
    }).select("-lectures");
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getCourseDetails = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();
    const teacherSlug = req.headers["x-tenant"]?.toLowerCase().trim();

    if (!slug || !teacherSlug) {
      return res.status(400).json({ message: "Slug and tenant required" });
    }

    const course = await Course.findOne({
      slug,
      teacherSlug,
      isPublished: true,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};
