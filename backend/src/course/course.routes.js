import { Router } from "express";
import { createCourse , getMyCourses , getCourses , updateCourse , deleteCourse , getCourseDetails  , getCourse} from "./course.controllers.js";
import { checkTenantAccess, protect , teacherOnly } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", protect, teacherOnly, createCourse);
router.get("/mycourses", protect, teacherOnly, getMyCourses);
router.get("/edit/:slug", protect, teacherOnly, getCourse);
router.patch("/edit/:slug", protect, teacherOnly, updateCourse);
router.delete("/delete/:slug", protect, teacherOnly, deleteCourse);


router.get("/", getCourses);
router.get("/:slug" , getCourseDetails)



export default router;