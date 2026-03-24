import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sendToken = (res, token, domain) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: "lax", // 🔥 important
    // domain, // set cookie for subdomains
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role, slug } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password required" });
    }
    // ---------------- TEACHER ----------------
    if (role === "teacher") {
      if (!slug) {
        return res.status(400).json({ message: "Slug required" });
      }
      const normalSlug = slug?.toLowerCase().trim();

      const existingEmail = await Teacher.findOne({ email });
      const existingSlug = await Teacher.findOne({ slug: normalSlug });

      if (existingEmail) {
        return res
          .status(400)
          .json({ message: "Teacher with email already exists" });
      }
      if (existingSlug) {
        return res.status(400).json({ message: "SubDomain is already used" });
      }

      const hashed = await bcrypt.hash(password, 10);

      const teacher = await Teacher.create({
        name,
        email,
        password: hashed,
        slug: normalSlug,
      });

      const token = jwt.sign(
        {
          id: teacher._id,
          role: "teacher",
          slug: teacher.slug,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      sendToken(res, token, process.env.COOKIE_DOMAIN);

      return res.status(201).json({
        user: {
          name: teacher.name,
          email: teacher.email,
          slug: teacher.slug,
        },
      });
    } else if (role === "student") {
      // ---------------- STUDENT ----------------

      const teacherSlug = req.headers["x-tenant"];

      if (!teacherSlug) {
        return res.status(400).json({ message: "Subdomain required" });
      }

      const existing = await Student.findOne({
        email,
        teacherSlug,
      });

      if (existing) {
        return res.status(400).json({ message: "Student already exists" });
      }

      const hashed = await bcrypt.hash(password, 10);

      const student = await Student.create({
        name,
        email,
        password: hashed,
        teacherSlug,
      });

      const token = jwt.sign(
        {
          id: student._id,
          role: "student",
          teacherSlug,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      sendToken(res, token, `${teacherSlug}.${process.env.COOKIE_DOMAIN}`);

      return res.status(201).json({
        user: {
          name: student.name,
          email: student.email,
          teacherSlug: student.teacherSlug,
        },
      });
    }

    return res.status(400).json({ message: "Invalid role" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (role === "teacher") {
      const teacher = await Teacher.findOne({ email });

      if (!teacher) {
        return res.status(400).json({ message: "No Teacher found" });
      }

      const isMatch = await bcrypt.compare(password, teacher.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: teacher._id,
          role: "teacher",
          slug: teacher.slug,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      sendToken(res, token, process.env.COOKIE_DOMAIN); // "edukate.in"

      return res.status(201).json({
        user: {
          name: teacher.name,
          email: teacher.email,
          slug: teacher.slug,
        },
      });
    } else if (role === "student") {
      const teacherSlug = req.headers["x-tenant"];

      if (!teacherSlug) {
        return res.status(400).json({ message: "Subdomain required" });
      }
      const student = await Student.findOne({ email, teacherSlug });

      if (!student) {
        return res.status(400).json({ message: "No Student found" });
      }
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: student._id,
          role: "student",
          teacherSlug,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      sendToken(res, token, `${teacherSlug}.${process.env.COOKIE_DOMAIN}`);

      return res.status(201).json({
        user: {
          name: student.name,
          email: student.email,
          teacherSlug: student.teacherSlug,
        },
      });
    }
    return res.status(400).json({ message: "Invalid role" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax"
  });

  res.status(200).json({ message: "Logged out successfully" });
};