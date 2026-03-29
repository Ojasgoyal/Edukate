import jwt from "jsonwebtoken";

export const extractTenant = (req, res, next) => {
  const tenant = req.headers["x-tenant"];
  
  req.tenant = tenant?.trim().toLowerCase() || null;

  next();
};

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

export const requireTenant = (req, res, next) => {
  if (!req.tenant) {
    return res.status(400).json({ message: "Tenant required" });
  }
  next();
};

export const validateStudentAccess = (req, res, next) => {
  if (req.user && req.user.role ==="student" && req.user.slug !== req.tenant) {
    return res.status(403).json({ message: "Unauthorized tenant" });
  }
  next();
};
 
export const teacherPreviewAccess = (req, res, next) => {
  if (req.user && req.user.role === "teacher" && req.user.slug === req.tenant) {
    req.isDemo = true;
  }
  next();
};

export const teacherOnly = (req, res, next) => {
  if (req.user && req.user.role !== "teacher") {
    return res.status(403).json({ message: "Teacher only access" });
  }
  next();
};

export const optionalAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    // invalid token → treat as not logged in
    req.user = null;
    next();
  }
};