import Course from "../models/course.js";
import User from "../models/User.js"

export const createCourse = async (req, res) => {
  try {
    const { title, description, slug , lectures } = req.body;
    const teacherId = req.user.id;
    const tenant = req.user.slug.toLowerCase().trim();
    const courseSlug = slug.toLowerCase().trim()

    if (!courseSlug) {
      return res.status(400).json({ message: "Slug is required" });
    }

    const courseExists = await Course.findOne({
      courseSlug,
      tenant,
    });

    if (courseExists) {
      return res
        .status(400)
        .json({ message: "Course slug must be unique for the teacher." });
    }

    const course = await Course.create({
      title,
      description,
      courseSlug,
      lectures,
      teacherId,
      tenant,
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
    const courseSlug = req.params.slug.toLowerCase().trim();

    const course = await Course.findOne({ courseSlug, teacherId: req.user.id });

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
    const courseSlug = req.params.slug.toLowerCase().trim();

    const course = await Course.findOne({
      courseSlug,
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
    const courseSlug = req.params.slug.toLowerCase().trim();

    const course = await Course.findOneAndDelete({
      courseSlug,
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

export const getCoursesforTenant = async (req, res) => {
  try {
    const tenant = req.tenant;

    if (!tenant) {
      return res.status(400).json({ message: "Tenant required" });
    }

    const existingTenant = await User.findOne({ slug:tenant , role:"teacher"})

    if(!existingTenant){
      return res.status(404).json({message:"No such Teacher Exists"})
    }

    const courses = await Course.find({
      tenant,
      isPublished: true,
    }).select("-lectures");

    res.status(200).json({ courses });

  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getCourseDetails = async (req, res) => {
  try {
    const courseSlug = req.params.slug.toLowerCase().trim();
    const tenant = req.tenant;

    if (!courseSlug || !tenant) {
      return res.status(400).json({ message: "Slug and tenant required" });
    }

    // if enrolled change course featching details as per it
    const course = await Course.findOne({
      courseSlug,
      tenant,
      isPublished: true,
    }).select("-lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};
