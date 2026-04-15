import jwt from "jsonwebtoken";

const resolveUser = (req) => {
  let finalUser = null;

  if (req.cookies?.teacher_token) {
    try {
      const decodedTeacher = jwt.verify(
        req.cookies.teacher_token,
        process.env.JWT_SECRET,
      );

      if (!req.tenant || decodedTeacher.slug === req.tenant) {
        finalUser = decodedTeacher;
      }
    } catch (error) {
      // Ignore expired/invalid teacher token
    }
  }

  if (!finalUser && req.cookies?.student_token) {
    try {
      const decodedStudent = jwt.verify(
        req.cookies.student_token,
        process.env.JWT_SECRET,
      );
      // Student must belong to the current requested tenant
      if (decodedStudent.slug === req.tenant) {
        finalUser = decodedStudent;
      }
    } catch (e) {
      // Ignore expired/invalid student token
    }
  }

  return finalUser;
};

export const extractTenant = (req, res, next) => {
  const tenant = req.headers["x-tenant"];

  req.tenant = tenant?.trim().toLowerCase() || null;

  next();
};

export const protect = (req, res, next) => {
  const user = resolveUserFromTokens(req);

  if (!user) {
    return res.status(401).json({
      message: "Not authorized, valid token for this context not found",
    });
  }

  req.user = user;
  next();
};

export const requireTenant = (req, res, next) => {
  if (!req.tenant) {
    return res.status(400).json({ message: "Tenant required" });
  }
  next();
};

export const validateStudentAccess = (req, res, next) => {
  if (req.user && req.user.role === "student" && req.user.slug !== req.tenant) {
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
  const user = resolveUserFromTokens(req);
  req.user = user; // Will be null if no valid token matched the context
  next();
};
