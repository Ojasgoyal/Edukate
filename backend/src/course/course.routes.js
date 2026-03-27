import { Router } from "express";
import { createCourse , getMyCourses , getCourses , updateCourse , deleteCourse , getCourseDetails  , getCourse} from "./course.controllers.js";
import { extractTenant , requireTenant , protect , teacherOnly, teacherPreviewAccess, validateStudentAccess , optionalAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", protect, teacherOnly ,  createCourse);
router.get("/mycourses", protect, teacherOnly, getMyCourses);
router.get("/edit/:slug", protect, teacherOnly, getCourse);
router.patch("/edit/:slug", protect, teacherOnly, updateCourse);
router.delete("/delete/:slug", protect, teacherOnly, deleteCourse);


router.get("/", extractTenant , requireTenant , getCourses);
router.get("/course/:slug" , optionalAuth , extractTenant , requireTenant , teacherPreviewAccess , getCourseDetails)



export default router;