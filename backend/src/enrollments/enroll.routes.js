import { Router } from "express"
import { protect , extractTenant , requireTenant , validateStudentAccess, teacherOnly } from "../middlewares/auth.middleware.js"
import { getEnrollments , getCourses , enroll , getTenantEnrollments} from "./enroll.controllers.js"


const router = Router()


// Student Routes
router.get("/courses" , protect , extractTenant , requireTenant , validateStudentAccess , getCourses)
router.post("/buy/:courseId" , protect , extractTenant , requireTenant , validateStudentAccess , enroll)

//Teacher Routes
router.get("/enrollments/:courseId" , protect , teacherOnly , getEnrollments)
router.get("/tenant-enrollments", protect, teacherOnly, getTenantEnrollments);

export default router;