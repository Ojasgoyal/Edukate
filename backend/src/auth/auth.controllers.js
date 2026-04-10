import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sendToken = (res, token, options = {}) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    ...options,
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role, slug } = req.body;
    const RESERVED_SUBDOMAINS = ["api", "admin", "www"];
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const domain =
      process.env.NODE_ENV === "production"
        ? req.user?.role === "teacher"
          ? ".edukate.in"
          : `${tenantSlug}.edukate.in`
        : undefined;
    // ---------------- TEACHER ----------------
    if (role === "teacher") {
      if (!slug) {
        return res.status(400).json({ message: "Slug required" });
      }

      const normalSlug = slug?.toLowerCase().trim();

      if (RESERVED_SUBDOMAINS.includes(normalSlug)) {
        return res.status(400).json({ message: "Reserved Subdomain" });
      }

      // check email already exists in same tenant
      const existingEmail = await User.findOne({
        email,
        role: "teacher",
      });

      if (existingEmail) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const existingSlug = await User.findOne({
        slug: normalSlug,
        role: "teacher",
      });

      if (existingSlug) {
        return res.status(400).json({
          message: "Subdomain already taken",
        });
      }

      const hashed = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashed,
        role: "teacher",
        slug: normalSlug,
      });

      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          slug: user.slug,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );


      sendToken(res, token, {
        domain,
      });

      return res.status(201).json({
        user: {
          name: user.name,
          email: user.email,
          slug: user.slug,
          role: user.role,
        },
      });
    } else if (role === "student") {
      // ---------------- STUDENT ----------------
      const tenantSlug = req.tenant?.toLowerCase().trim();

      if (!tenantSlug) {
        return res.status(400).json({ message: "Tenant Slug required" });
      }

      const teacherExists = await User.findOne({
        slug: tenantSlug,
        role: "teacher",
      });

      if (!teacherExists) {
        return res.status(404).json({
          message: "Invalid tenant",
        });
      }

      const existing = await User.findOne({
        email,
        slug: tenantSlug,
      });

      if (existing) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const hashed = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashed,
        role: "student",
        slug: tenantSlug,
      });

      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          slug: user.slug,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      sendToken(res, token, {
        domain,
      });

      return res.status(201).json({
        user: {
          name: user.name,
          email: user.email,
          slug: user.slug,
          role: user.role,
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
    const { email, password, role, slug } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password, role required",
      });
    }

    let user;

    // ---------------- TEACHER ----------------
    if (role === "teacher") {
      user = await User.findOne({
        email,
        role: "teacher",
      });

      if (!user) {
        return res.status(400).json({
          message: "No teacher found",
        });
      }

      if (!req.tenant) {
        req.tenant = user.slug; // set tenant for student login later
      }
    }

    // ---------------- STUDENT ----------------
    if (role === "student") {
      const tenantSlug = req.tenant?.toLowerCase().trim();
      if (!tenantSlug) {
        return res.status(400).json({
          message: "Tenant required",
        });
      }

      user = await User.findOne({
        email,
        role: "student",
        slug: tenantSlug,
      });

      if (!user) {
        return res.status(400).json({
          message: "No student found",
        });
      }
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        slug: user.slug,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const domain =
      process.env.NODE_ENV === "production"
        ? req.user?.role === "teacher"
          ? ".edukate.in"
          : `${user.slug}.edukate.in`
        : undefined;

    if (role === "teacher") {
      sendToken(res, token, {
        domain,
      });
    } else {
      sendToken(res, token, {
        domain,
      });
    }

    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        slug: user.slug,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  const tenantSlug = req.tenant?.toLowerCase().trim();

  const domain =
    process.env.NODE_ENV === "production"
      ? req.user?.role === "teacher"
        ? ".edukate.in"
        : `${tenantSlug}.edukate.in`
      : undefined;

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    domain,
  });

  res.status(200).json({ message: "Logged out successfully" });
};
