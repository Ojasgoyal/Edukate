import { Router } from "express";
import { login, register , logout } from "./auth.controllers.js";
import { extractTenant , teacherOnly , protect  , requireTenant , teacherPreviewAccess , validateStudentAccess } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", extractTenant , register);
router.post("/login", extractTenant , login);

router.get(
  "/me",
  protect,
  extractTenant,
  teacherPreviewAccess,
  validateStudentAccess,
  (req, res) => {
    res.json({
      user: req.user,
      tenant: req.tenant,
      isDemo: req.isDemo || false,
    });
  }
);

router.get

router.post("/logout", protect ,logout);

export default router;
