import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const checkTenantAccess = (req, res, next) => {
  const requestedSlug = req.headers["x-tenant"];

  if (!requestedSlug) {
    return res.status(400).json({ message: "Tenant not provided" });
  }

  // ---------------- TEACHER ----------------
  if (req.user.role === "teacher") {
    // allow ONLY their own tenant
    if (req.user.slug !== requestedSlug) {
      return res.status(403).json({
        message: "You cannot access another teacher's tenant",
      });
    }

    req.tenant = requestedSlug;
    return next();
  }

  // ---------------- STUDENT ----------------
  if (req.user.role === "student") {
    if (req.user.teacherSlug !== requestedSlug) {
      return res.status(403).json({
        message: "Unauthorized tenant access",
      });
    }

    req.tenant = requestedSlug;
    return next();
  }

  return res.status(403).json({ message: "Invalid role" });
};


export const teacherOnly = (req, res, next) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Teacher access only" });
  }
  next();
};